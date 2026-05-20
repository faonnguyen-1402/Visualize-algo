'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  type: string;
  angle: number;
  rotateSpeed: number;
  opacity: number;
}

const shapes = ['circle', 'triangle', 'square', 'diamond', 'hexagon', 'lightning', 'line'];

// ==================== CÁC THÔNG SỐ DỄ CHỈNH ====================
const CONFIG = {
  // TỐC ĐỘ
  speedMultiplier: 0.5,        // Tăng/giảm tốc độ di chuyển (1.0 = mặc định)
  rotationSpeedMultiplier: 1.0, // Tốc độ xoay (1.0 = mặc định)

  // ĐỘ SÁNG & ĐỘ ĐẬY
  baseOpacity: 0.4,           // Độ sáng trung bình (0.1 - 1.0)
  opacityVariation: 0.2,      // Biến thiên độ sáng (±)

  lineWidth: 1.8,              // Độ dày đường viền
  particleCountFactor: 8500,   // Càng nhỏ càng nhiều hạt (khuyến nghị 7000-10000)

  strokeColor: '#ffffff67',      // '#a5b4fc', '#67e8f9', '#c084fc'...
} as const;
// ============================================================

const GeometricBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  const createParticle = useCallback((width: number, height: number): Particle => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 7 + 3,
    speedX: (Math.random() * 1.4 - 0.7) * CONFIG.speedMultiplier,
    speedY: (Math.random() * 1.4 - 0.7) * CONFIG.speedMultiplier,
    type: shapes[Math.floor(Math.random() * shapes.length)],
    angle: Math.random() * Math.PI * 2,
    rotateSpeed: (Math.random() - 0.5) * 0.028 * CONFIG.rotationSpeedMultiplier,
    opacity: CONFIG.baseOpacity + Math.random() * CONFIG.opacityVariation,
  }), []);

  const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.strokeStyle = CONFIG.strokeColor;
    ctx.lineWidth = CONFIG.lineWidth;

    // ... (phần vẽ các shape giữ nguyên như trước)
    switch (p.type) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.3);
        ctx.lineTo(-p.size, p.size * 0.9);
        ctx.lineTo(p.size, p.size * 0.9);
        ctx.closePath();
        ctx.stroke();
        break;

      case 'square':
        ctx.strokeRect(-p.size, -p.size, p.size * 2, p.size * 2);
        break;

      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.4);
        ctx.lineTo(p.size * 1.4, 0);
        ctx.lineTo(0, p.size * 1.4);
        ctx.lineTo(-p.size * 1.4, 0);
        ctx.closePath();
        ctx.stroke();
        break;

      case 'hexagon':
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const ang = (Math.PI * 2) / 6 * i;
          ctx.lineTo(Math.cos(ang) * p.size * 1.15, Math.sin(ang) * p.size * 1.15);
        }
        ctx.closePath();
        ctx.stroke();
        break;

      case 'lightning':
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.6);
        ctx.lineTo(p.size * 0.7, -p.size * 0.4);
        ctx.lineTo(-p.size * 0.6, p.size * 0.5);
        ctx.lineTo(p.size * 0.8, p.size * 1.6);
        ctx.stroke();
        break;

      case 'line':
        ctx.beginPath();
        ctx.moveTo(-p.size * 1.6, 0);
        ctx.lineTo(p.size * 1.6, 0);
        ctx.stroke();
        break;
    }
    ctx.restore();
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.rotateSpeed;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      drawParticle(ctx, p);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const targetCount = Math.floor(Math.min(width * height / CONFIG.particleCountFactor, 180));
    
    const particles = particlesRef.current;
    while (particles.length < targetCount) particles.push(createParticle(width, height));
    while (particles.length > targetCount + 20) particles.pop();
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    const initialCount = Math.floor(Math.min(window.innerWidth * window.innerHeight / CONFIG.particleCountFactor, 180));
    particlesRef.current = Array.from({ length: initialCount }, () =>
      createParticle(window.innerWidth, window.innerHeight)
    );

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate, resizeCanvas, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="geometric-bg"
    />
  );
};

export default GeometricBackground;