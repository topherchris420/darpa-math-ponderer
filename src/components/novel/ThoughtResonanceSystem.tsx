
import React, { useRef, useEffect, useState } from 'react';

interface ResonanceWave {
  id: string;
  frequency: number;
  amplitude: number;
  phase: number;
  decay: number;
  origin: { x: number; y: number };
  concept: string;
}

interface ThoughtResonanceSystemProps {
  thoughts: string[];
  entropy: number;
  className?: string;
}

export const ThoughtResonanceSystem: React.FC<ThoughtResonanceSystemProps> = ({
  thoughts,
  entropy,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resonanceWaves, setResonanceWaves] = useState<ResonanceWave[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Generate resonance waves from recent thoughts
    const newWaves: ResonanceWave[] = [];
    
    thoughts.slice(-5).forEach((thought, index) => {
      const words = thought.split(' ').filter(word => word.length > 4);
      const keyWords = words.slice(0, 3);
      
      keyWords.forEach((word, wordIndex) => {
        const frequency = (word.length + wordIndex) * 0.02 + Math.random() * 0.01;
        const amplitude = 20 + entropy * 2 + Math.random() * 10;
        
        newWaves.push({
          id: `${index}-${wordIndex}-${Date.now()}`,
          frequency: frequency,
          amplitude: amplitude,
          phase: Math.random() * Math.PI * 2,
          decay: 0.995 - entropy * 0.001,
          origin: {
            x: 100 + index * 80 + Math.random() * 100,
            y: 100 + wordIndex * 60 + Math.random() * 100
          },
          concept: word
        });
      });
    });

    setResonanceWaves(prev => [...prev.slice(-20), ...newWaves]);
  }, [thoughts, entropy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    let time = 0;

    const animate = () => {
      // Create subtle transparency for wave trails
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Update and draw resonance waves
      const updatedWaves = resonanceWaves.map(wave => ({
        ...wave,
        amplitude: wave.amplitude * wave.decay,
        phase: wave.phase + wave.frequency
      })).filter(wave => wave.amplitude > 0.5);

      setResonanceWaves(updatedWaves);

      // Draw wave interference patterns
      updatedWaves.forEach((wave, index) => {
        const { origin, frequency, amplitude, phase, concept } = wave;
        
        // Calculate wave pattern
        for (let x = 0; x < rect.width; x += 4) {
          for (let y = 0; y < rect.height; y += 4) {
            const dx = x - origin.x;
            const dy = y - origin.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < amplitude * 3) {
              const waveValue = Math.sin(distance * frequency + phase + time) * 
                              Math.exp(-distance / (amplitude * 2));
              
              const intensity = Math.abs(waveValue) * (amplitude / 50);
              const hue = (concept.charCodeAt(0) * 3 + index * 30) % 360;
              
              ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${intensity * 0.3})`;
              ctx.fillRect(x, y, 2, 2);
            }
          }
        }

        // Draw wave center
        ctx.fillStyle = `rgba(168, 85, 247, ${amplitude / 100})`;
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, 3 + Math.sin(phase) * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw concept label
        if (amplitude > 10) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(amplitude / 50, 0.8)})`;
          ctx.font = `${8 + amplitude / 20}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(concept.substring(0, 8), origin.x, origin.y - 15);
        }
      });

      // Draw resonance interference lines
      for (let i = 0; i < updatedWaves.length; i++) {
        for (let j = i + 1; j < updatedWaves.length; j++) {
          const wave1 = updatedWaves[i];
          const wave2 = updatedWaves[j];
          
          const dx = wave2.origin.x - wave1.origin.x;
          const dy = wave2.origin.y - wave1.origin.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200 && wave1.concept.includes(wave2.concept.charAt(0))) {
            const resonance = Math.sin(wave1.phase - wave2.phase) * 0.5 + 0.5;
            const opacity = resonance * (wave1.amplitude + wave2.amplitude) / 100;
            
            ctx.strokeStyle = `rgba(192, 132, 252, ${opacity * 0.5})`;
            ctx.lineWidth = 1 + resonance * 2;
            ctx.beginPath();
            ctx.moveTo(wave1.origin.x, wave1.origin.y);
            ctx.lineTo(wave2.origin.x, wave2.origin.y);
            ctx.stroke();
          }
        }
      }

      time += 0.05;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resonanceWaves]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="absolute top-2 left-2 text-xs text-purple-300 bg-slate-900/70 px-2 py-1 rounded">
        Thought Resonance Patterns: {resonanceWaves.length} active waves
      </div>
    </div>
  );
};
