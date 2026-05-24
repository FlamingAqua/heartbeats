"use client";

import { useEffect, useRef } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

export default function BeatParticles({ trigger }: { trigger: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  // 🔥 create explosion
  useEffect(() => {
    const particles: Particle[] = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        id: Math.random(),
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        life: 1,
      });
    }

    particlesRef.current = particles;

    const container = containerRef.current;
    if (!container) return;

    // create DOM nodes once
    container.innerHTML = "";

    particles.forEach((p) => {
      const el = document.createElement("div");
      el.className =
        "absolute w-2 h-2 bg-green-400 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.9)]";
      el.style.left = `${p.x}px`;
      el.style.top = `${p.y}px`;
      el.dataset.id = String(p.id);
      container.appendChild(el);
    });

    // 🚀 animation loop (NO React state)
    const animate = () => {
      const nodes = container.children;

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        const node = nodes[i] as HTMLElement;
        if (!node) return;

        node.style.left = `${p.x}px`;
        node.style.top = `${p.y}px`;
        node.style.opacity = String(p.life);
      });

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[999]"
    />
  );
}