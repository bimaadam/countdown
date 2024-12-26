// components/fireworks.tsx
import { useEffect, useRef } from "react";

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Check if canvas is null

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Ensure ctx is not null

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

    type Particle = {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocityX: number;
      velocityY: number;
      alpha: number;
    };

    function createParticle(x: number, y: number) {
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          alpha: 1,
        });
      }
    }

    function updateParticles() {
      particles.forEach((particle, index) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.alpha -= 0.01;

        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        }
      });
    }

    function drawParticles() {
      if (!ctx) return; // Ensure ctx is not null before drawing
      particles.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      });
    }

    function loop() {
      if (!ctx) return; // Ensure ctx is not null before clearing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawParticles();
      updateParticles();

      requestAnimationFrame(loop);
    }

    // Fireworks automatically in the center
    const interval = setInterval(() => {
      createParticle(window.innerWidth / 2, window.innerHeight / 2);
    }, 500);

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createParticle(x, y);
    });

    loop();

    return () => {
      clearInterval(interval); // Cleanup interval
      canvas.removeEventListener("click", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 z-10"></canvas>;
};

export default Fireworks;