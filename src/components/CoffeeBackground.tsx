import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'bean' | 'steam' | 'ember';
}

export const CoffeeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles: beans, rising steam wisps, and golden embers
    const particleCount = 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'bean' | 'steam' | 'ember' =
        typeRand < 0.25 ? 'bean' : typeRand < 0.65 ? 'steam' : 'ember';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          type === 'bean'
            ? Math.random() * 8 + 6
            : type === 'steam'
            ? Math.random() * 28 + 14
            : Math.random() * 2.5 + 1,
        speedY:
          type === 'bean'
            ? -(Math.random() * 0.35 + 0.15)
            : type === 'steam'
            ? -(Math.random() * 0.5 + 0.25)
            : -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity:
          type === 'bean'
            ? Math.random() * 0.25 + 0.1
            : type === 'steam'
            ? Math.random() * 0.12 + 0.04
            : Math.random() * 0.45 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        type,
      });
    }

    const drawCoffeeBean = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = opacity;

      // Coffee bean body (dark roasted amber brown)
      context.fillStyle = '#3a2315';
      context.beginPath();
      context.ellipse(0, 0, size * 0.75, size, 0, 0, Math.PI * 2);
      context.fill();

      // Middle crease
      context.strokeStyle = '#1b0f07';
      context.lineWidth = size * 0.18;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(0, -size * 0.7);
      context.bezierCurveTo(
        size * 0.2,
        -size * 0.2,
        -size * 0.2,
        size * 0.2,
        0,
        size * 0.7
      );
      context.stroke();

      context.restore();
    };

    const drawSteamWisp = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      context.save();
      context.globalAlpha = opacity;
      const gradient = context.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, 'rgba(212, 163, 115, 0.25)');
      gradient.addColorStop(0.5, 'rgba(180, 130, 90, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawEmber = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      context.save();
      context.globalAlpha = opacity;
      context.fillStyle = '#e8a857';
      context.shadowColor = '#d48d3b';
      context.shadowBlur = 6;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric ambient radial gradients
      const radial1 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.25,
        50,
        width * 0.8,
        height * 0.25,
        width * 0.65
      );
      radial1.addColorStop(0, 'rgba(120, 70, 32, 0.18)');
      radial1.addColorStop(0.6, 'rgba(45, 25, 12, 0.08)');
      radial1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial1;
      ctx.fillRect(0, 0, width, height);

      const radial2 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.7,
        30,
        width * 0.15,
        height * 0.7,
        width * 0.5
      );
      radial2.addColorStop(0, 'rgba(92, 51, 23, 0.12)');
      radial2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial2;
      ctx.fillRect(0, 0, width, height);

      if (isPlaying) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.y += p.speedY;
          p.x += p.speedX;
          p.rotation += p.rotationSpeed;

          // Wrap around top/sides
          if (p.y < -p.size * 2) {
            p.y = height + p.size * 2;
            p.x = Math.random() * width;
          }
          if (p.x < -p.size * 2) p.x = width + p.size;
          if (p.x > width + p.size * 2) p.x = -p.size;

          if (p.type === 'bean') {
            drawCoffeeBean(ctx, p.x, p.y, p.size, p.rotation, p.opacity);
          } else if (p.type === 'steam') {
            drawSteamWisp(ctx, p.x, p.y, p.size, p.opacity);
          } else {
            drawEmber(ctx, p.x, p.y, p.size, p.opacity);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Subtle toggle for accessibility / user preference */}
      <button
        type="button"
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-4 left-4 z-40 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase text-stone-400 bg-stone-900/80 backdrop-blur-sm border border-stone-800 rounded hover:text-amber-300 hover:border-amber-900/60 transition-colors"
        title="Toggle background coffee atmosphere"
      >
        {isPlaying ? 'Atmosphere: Active' : 'Atmosphere: Paused'}
      </button>
    </>
  );
};
