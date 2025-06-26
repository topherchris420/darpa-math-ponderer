
import React from 'react';

interface EnhancedParticle extends ThinkingParticle {
  trail: { x: number; y: number; alpha: number }[];
  color: string;
  size: number;
}

interface ThinkingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  concept: string;
}

interface EnhancedParticleSystemProps {
  ctx: CanvasRenderingContext2D;
  time: number;
  depth: number;
  particles: React.MutableRefObject<EnhancedParticle[]>;
  isPaused: boolean;
}

export const EnhancedParticleSystem = {
  initializeParticles: (count: number, canvas: HTMLCanvasElement): EnhancedParticle[] => {
    const particles: EnhancedParticle[] = [];
    const colors = ['rgba(147, 51, 234, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(192, 132, 252, 0.8)'];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1.0,
        concept: ['∞', '□', '○', '△', '◇', '∴', '∵', '∈'][Math.floor(Math.random() * 8)],
        trail: [],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8
      });
    }
    return particles;
  },

  updateAndDrawParticles: ({ ctx, time, depth, particles, isPaused }: EnhancedParticleSystemProps) => {
    if (isPaused) return;

    particles.current.forEach((particle, index) => {
      // Update trail
      particle.trail.push({ x: particle.x, y: particle.y, alpha: 1.0 });
      if (particle.trail.length > 15) {
        particle.trail.shift();
      }

      // Update particle physics with smoother movement
      particle.x += particle.vx * (0.5 + depth * 0.1);
      particle.y += particle.vy * (0.5 + depth * 0.1);
      particle.life -= 0.003;

      // Add magnetic attraction to center for more interesting movement
      const centerX = ctx.canvas.width / 2;
      const centerY = ctx.canvas.height / 2;
      const dx = centerX - particle.x;
      const dy = centerY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 100) {
        particle.vx += (dx / distance) * 0.02;
        particle.vy += (dy / distance) * 0.02;
      }

      // Wrap around screen
      if (particle.x < -50) particle.x = ctx.canvas.width + 50;
      if (particle.x > ctx.canvas.width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = ctx.canvas.height + 50;
      if (particle.y > ctx.canvas.height + 50) particle.y = -50;

      // Respawn if life depleted
      if (particle.life <= 0) {
        particle.x = Math.random() * ctx.canvas.width;
        particle.y = Math.random() * ctx.canvas.height;
        particle.vx = (Math.random() - 0.5) * 3;
        particle.vy = (Math.random() - 0.5) * 3;
        particle.life = 1.0;
        particle.trail = [];
      }

      // Draw enhanced trail with fade effect
      particle.trail.forEach((point, trailIndex) => {
        point.alpha *= 0.95;
        ctx.save();
        ctx.globalAlpha = point.alpha * particle.life;
        ctx.fillStyle = particle.color;
        const trailSize = particle.size * (trailIndex / particle.trail.length) * 0.5;
        ctx.beginPath();
        ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw main particle with glow effect
      ctx.save();
      ctx.globalAlpha = particle.life * (0.8 + Math.sin(time + index) * 0.2);
      ctx.fillStyle = particle.color;
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 15;
      ctx.font = `${particle.size + Math.sin(time + index) * 2}px monospace`;
      ctx.fillText(particle.concept, particle.x, particle.y);
      ctx.restore();
    });
  }
};
