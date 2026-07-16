"use client";

import { useState } from "react";
import { SERVICES } from "./services";
import { Arrow } from "./Arrow";
import { CTA_BASE, CTA_ARROW } from "./cta";

const SERVICE_OPTIONS = SERVICES.map((s) => s.title);

const WHATSAPP_NUMBER = "919016792014";

export default function ContactForm() {
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

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3.5 font-body text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/40";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="mb-1 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/50">
        Fill the form to request a quote:
      </p>

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

      <textarea
        required
        placeholder="Tell us about your project *"
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`resize-none ${inputClass}`}
      />

      <div className="mt-2">
        <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/50">
          Services you&apos;re interested in
        </p>
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
                  className={`h-[1.125rem] w-[1.125rem] shrink-0 rounded-full border transition-colors ${
                    selected ? "border-white bg-white" : "border-white/30"
                  }`}
                />
                <span
                  className={`font-body text-sm transition-colors ${
                    selected ? "text-white" : "text-white/45"
                  }`}
                >
                  {service}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <button type="submit" className={`mt-4 inline-flex w-fit ${CTA_BASE}`}>
        Send Message
        <Arrow invert className={CTA_ARROW} />
      </button>
    </form>
  );
}
