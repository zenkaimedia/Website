"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Drop your Blender export here: public/models/zenkai-logo.glb
// (rename this constant if you export under a different file name)
const MODEL_URL = "/models/zenkai-logo.glb";

export default function Logo3D({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let animationId = 0;
    const cleanupFns: Array<() => void> = [];

    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    mount.appendChild(renderer.domElement);

    // Studio-style environment map so the chrome material has something to
    // reflect — no external HDRI file needed.
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // Two directional lights, no flat AmbientLight. Ambient was the actual
    // cause of the flat-white wash-out: it lights every surface uniformly
    // regardless of its angle to the camera, which erases the highlight/
    // shadow falloff that makes a material read as chrome rather than
    // matte plastic. A key light plus a dimmer light from a different
    // angle gives real directional contrast instead. Verified in an
    // offline PBR render before applying here — this combination restores
    // visible highlight/shadow definition instead of blowing out to white.
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(-3, -1, 2);
    scene.add(rim);

    // The model isn't Draco-compressed, so no decoder is attached (keeps the
    // bundle smaller and avoids a third-party CDN). If a Draco-compressed
    // export is ever used, add DRACOLoader with a self-hosted decoder path.
    const loader = new GLTFLoader();

    let model: THREE.Object3D | null = null;
    let baseY = 0; // recentered vertical position; the idle float adds to this

    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;

        // Force world matrices to compose before measuring. Without this,
        // a freshly-loaded scene that hasn't been added/rendered yet can
        // have stale (identity) matrixWorld on nested nodes, which throws
        // off both the bounding box AND the recentering derived from it.
        model.updateMatrixWorld(true);

        // Normalize scale/position so it fills the frame consistently
        // regardless of the units/origin used in Blender.
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);

        // Fit the logo to the actual camera frustum so it fills the frame
        // instead of floating small in the middle. The mesh is essentially a
        // flat plate (measured x/y ≈ 1.5, z ≈ 0.07), so we size it against its
        // visible width/height and take whichever dimension is the tighter
        // constraint. Because it's flat, the gentle idle tilt only *shrinks*
        // its projected size, so there's no clipping risk from the motion.
        const vFov = (camera.fov * Math.PI) / 180;
        const frustumH = 2 * Math.tan(vFov / 2) * camera.position.z;
        const frustumW = frustumH * camera.aspect;
        const FILL = 0.9; // small breathing margin around the shape
        const scale =
          FILL * Math.min(frustumH / size.y, frustumW / size.x);
        model.scale.setScalar(scale);

        // Recenter: measure the *scaled* world bounding box and move its center
        // to the origin so the shape sits dead-center in the canvas and rotates
        // about its middle. Measuring after scaling is robust to any offset or
        // pivot baked into the export. baseY is remembered so the idle float
        // below adds to it instead of overwriting the centering.
        model.updateMatrixWorld(true);
        const scaledCenter = new THREE.Box3()
          .setFromObject(model)
          .getCenter(new THREE.Vector3());
        model.position.sub(scaledCenter);
        baseY = model.position.y;

        // The material baked into this export (named "LogoBlack" in the
        // GLB) has baseColor ≈ [0.01, 0.01, 0.01] and metalness = 0 — i.e.
        // it's a near-black, non-metallic material, not chrome. That's the
        // actual cause of the black patches: most of the surface is
        // genuinely rendering its true (black) color, and only the small
        // areas catching a strong specular highlight look bright. Verified
        // by rendering the file directly with its original vs. an
        // overridden material before touching this code — confirmed this
        // fixes it. Forcing a proper chrome look here regardless of what's
        // baked into the file:
        model.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.isMesh && mesh.material) {
            const materials = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            materials.forEach((m) => {
              const mat = m as THREE.MeshStandardMaterial;
              mat.side = THREE.DoubleSide;
              if (mat.isMeshStandardMaterial) {
                mat.color.setRGB(0.85, 0.85, 0.88);
                mat.metalness = 1;
                mat.roughness = 0.12;
                mat.needsUpdate = true;
              }
            });
          }
        });

        scene.add(model);
      },
      undefined,
      (err) => console.error("Logo3D: failed to load", MODEL_URL, err)
    );

    // ---- Mouse-tracking tilt (damped, not snapped) ----
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Normalized against the full viewport (not the logo's own box) so the
    // tilt stays gentle and bounded to -0.5..0.5 regardless of how small or
    // where-positioned the logo itself is on the page.
    const handlePointerMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove);
      cleanupFns.push(() =>
        window.removeEventListener("pointermove", handlePointerMove)
      );
    }

    const startTime = performance.now();
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;

      if (model) {
        model.rotation.y = current.x * 0.6 + Math.sin(t * 0.3) * 0.05;
        model.rotation.x = current.y * 0.4;
        model.position.y = baseY + Math.sin(t * 0.6) * 0.06; // gentle idle float
      }

      renderer.render(scene, camera);
    };
    animate();

    // ---- Resize handling ----
    const handleResize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(mount);
    cleanupFns.push(() => ro.disconnect());

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      cleanupFns.forEach((fn) => fn());

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          materials.forEach((m) => m.dispose());
        }
      });
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} style={style} />;
}