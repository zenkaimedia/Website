"use client";

import { useState } from "react";
import { SERVICES } from "./services";
import { Arrow } from "./Arrow";
import { CTA_ARROW } from "./cta";

const SERVICE_OPTIONS = SERVICES.map((s) => s.title);

const WHATSAPP_NUMBER = "919016792014";

export default function ContactForm({
  variant = "dark",
}: {
  /** "dark" for the black sections, "light" for the contact page. */
  variant?: "dark" | "light";
}) {
  const light = variant === "light";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState<string[]>([]);

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = [
      `Hi Zenkai Media, I'd like to start a project.`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      services.length ? `Services: ${services.join(", ")}` : null,
      ``,
      message,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  /* Mobile needs vw-driven sizes: the fluid root pins to 13px there, so plain
     rem utilities render far too small. `md:` restores the (large) desktop scale
     used across both the light contact page and the dark contact sections. */
  const fieldSize =
    "px-4 py-[clamp(0.85rem,3.6vw,1.15rem)] text-[clamp(0.95rem,4.4vw,1.3rem)] md:px-5 md:py-5 md:text-[1.1875rem]";

  const inputClass = light
    ? `w-full rounded-lg border border-black/15 bg-transparent font-body text-black placeholder:text-black/45 outline-none transition-colors focus:border-black/45 ${fieldSize}`
    : `w-full rounded-lg border border-white/10 bg-white/[0.02] font-body text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/40 ${fieldSize}`;

  /* Sized + tracked so the longest label ("Fill the form to request a quote:")
     stays on a single line at any width. */
  const labelClass = `whitespace-nowrap font-mono text-[clamp(0.7rem,3.1vw,1.15rem)] uppercase tracking-[0.12em] ${light
      ? "md:text-[1.0625rem] md:tracking-[0.1em] text-black/70"
      : "md:text-[0.8125rem] md:tracking-[0.2em] text-white/55"
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className={`mb-1 ${labelClass}`}>Fill the form to request a quote:</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          type="text"
          placeholder="Your Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          required
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <input
        type="tel"
        placeholder="Phone (Optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClass}
      />

      {/* On the contact page this field matches the other inputs' height so the
         whole page fits one screen (as in the reference). */}
      <textarea
        required
        placeholder="Tell us about your project *"
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`resize-none ${light ? "md:h-[4.4rem]" : ""} ${inputClass}`}
      />

      <div className="mt-2">
        <p className={`mb-4 ${labelClass}`}>Services you&apos;re interested in</p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((service) => {
            const selected = services.includes(service);
            return (
              <label
                key={service}
                className="flex w-fit cursor-pointer items-center gap-3 select-none"
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleService(service)}
                  className="sr-only"
                />
                {/* Circular selector — fills white when selected */}
                <span
                  className={`h-[clamp(1.3rem,5.5vw,1.6rem)] w-[clamp(1.3rem,5.5vw,1.6rem)] shrink-0 rounded-full border transition-colors md:h-[1.2rem] md:w-[1.2rem] ${
                    selected
                      ? light
                        ? "border-black bg-black"
                        : "border-white bg-white"
                      : light
                        ? "border-black/30"
                        : "border-white/30"
                  }`}
                />
                <span
                  className={`font-body text-[clamp(0.95rem,4.4vw,1.3rem)] transition-colors md:text-[1.1875rem] ${
                    selected
                      ? light
                        ? "text-black"
                        : "text-white"
                      : light
                        ? "text-black/50"
                        : "text-white/45"
                  }`}
                >
                  {service}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {light ? (
        /* Light page → solid black button with the white dotted arrow */
        <button
          type="submit"
          className="group mt-4 inline-flex w-fit items-center justify-between rounded-xl bg-black px-8 py-[clamp(1rem,4vw,1.35rem)] font-body text-[clamp(1rem,4.4vw,1.3rem)] font-medium text-white shadow-lg transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:bg-black/85 md:px-10 md:py-5 md:text-[1.1875rem]"
        >
          Send Message
          <Arrow className={CTA_ARROW} />
        </button>
      ) : (
        /* Dark section → black button with white text + subtle ring for contrast */
        <button
          type="submit"
          className="group mt-4 inline-flex w-fit items-center justify-between rounded-xl bg-black px-8 py-[clamp(1rem,4vw,1.35rem)] font-body text-[clamp(1rem,4.4vw,1.3rem)] font-medium text-white shadow-lg ring-1 ring-white/15 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:bg-[#141414] md:px-10 md:py-5 md:text-[1.1875rem]"
        >
          Send Message
          <Arrow className={CTA_ARROW} />
        </button>
      )}
    </form>
  );
}
