'use client';

import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const POINT_COUNT = 40; 
    const CONNECTION_DISTANCE = 150;
    const POINT_SPEED = 1.5;
    const MOUSE_RADIUS = 200;

    const handleResize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      
      ctx.scale(pixelRatio, pixelRatio);
      
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      pointsRef.current = Array.from({ length: POINT_COUNT }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * POINT_SPEED,
        vy: (Math.random() - 0.5) * POINT_SPEED
      }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Suit la position de la souris
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation background
    const animate = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // dessine les points
      pointsRef.current.forEach(point => {
        // Déplacement
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Réaction à la souris
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          point.vx += (dx / distance) * force * 0.02;
          point.vy += (dy / distance) * force * 0.02;
        }

        // Limiter la vitesse
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        if (speed > POINT_SPEED) {
          point.vx = (point.vx / speed) * POINT_SPEED;
          point.vy = (point.vy / speed) * POINT_SPEED;
        }
      });

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      pointsRef.current.forEach((point, i) => {
        pointsRef.current.slice(i + 1).forEach(otherPoint => {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.25})`;
            ctx.lineWidth = 1.5 / pixelRatio;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      pointsRef.current.forEach(point => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'; 
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2.5 / pixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default BackgroundEffect;
