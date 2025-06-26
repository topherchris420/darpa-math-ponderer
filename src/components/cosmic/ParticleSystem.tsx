
import React from 'react';

interface ThinkingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  concept: string;
}

interface ParticleSystemProps {
  ctx: CanvasRenderingContext2D;
  time: number;
  depth: number;
  particles: React.MutableRefObject<ThinkingParticle[]>;
}

export const ParticleSystem = {
  drawThinkingParticles: ({ ctx, time, depth, particles }: ParticleSystemProps) => {
    particles.current.forEach((particle, index) => {
      // Update particle physics
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.005;

      // Wrap around screen
      if (particle.x < 0) particle.x = ctx.canvas.width;
      if (particle.x > ctx.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = ctx.canvas.height;
      if (particle.y > ctx.canvas.height) particle.y = 0;

      // Respawn if life depleted
      if (particle.life <= 0) {
        particle.x = Math.random() * ctx.canvas.width;
        particle.y = Math.random() * ctx.canvas.height;
        particle.vx = (Math.random() - 0.5) * 3;
        particle.vy = (Math.random() - 0.5) * 3;
        particle.life = 1.0;
        particle.concept = ['∞', '□', '○', '△', '◇', '∴', '∵', '∈'][Math.floor(Math.random() * 8)];
      }

      // Draw thinking symbol
      ctx.save();
      ctx.globalAlpha = particle.life * (0.6 + depth * 0.1);
      ctx.fillStyle = `rgba(147, 51, 234, ${particle.life})`;
      ctx.font = `${12 + Math.sin(time + index) * 4}px monospace`;
      ctx.fillText(particle.concept, particle.x, particle.y);
      
      // Add glow effect
      ctx.shadowColor = 'rgba(147, 51, 234, 0.8)';
      ctx.shadowBlur = 10;
      ctx.fillText(particle.concept, particle.x, particle.y);
      ctx.restore();
    });
  },

  drawThoughtConnections: (ctx: CanvasRenderingContext2D, time: number, depth: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    
    ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 + Math.sin(time) * 0.1})`;
    ctx.lineWidth = 1;
    
    // Draw pulsing neural connections
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time * 0.5;
      const radius = 100 + Math.sin(time + i) * 50;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.globalAlpha = 0.3 + Math.sin(time + i) * 0.2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Draw thinking nodes
      ctx.fillStyle = `rgba(192, 132, 252, ${0.6 + Math.sin(time + i) * 0.3})`;
      ctx.beginPath();
      ctx.arc(x, y, 3 + Math.sin(time + i) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
};
