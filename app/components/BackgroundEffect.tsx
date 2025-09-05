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
      const rect = canvas.getBoundingClientRect();
      
      // Définir la taille du canvas sans pixelRatio pour éviter les problèmes
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Réinitialiser les points uniquement si le canvas a vraiment changé de taille
      if (pointsRef.current.length === 0 || 
          Math.abs(rect.width - (pointsRef.current[0]?.x || 0)) > 100 ||
          Math.abs(rect.height - (pointsRef.current[0]?.y || 0)) > 100) {
        pointsRef.current = Array.from({ length: POINT_COUNT }, () => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * POINT_SPEED,
          vy: (Math.random() - 0.5) * POINT_SPEED
        }));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Écouter les changements de zoom
    let resizeTimeout: NodeJS.Timeout;
    const handleZoom = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', handleZoom);
    window.addEventListener('orientationchange', handleZoom);

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
      const rect = canvas.getBoundingClientRect();
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // dessine les points
      pointsRef.current.forEach(point => {
        // Déplacement
        point.x += point.vx;
        point.y += point.vy;

        // Rebond sur les bords avec la vraie taille du canvas
        if (point.x < 0 || point.x > rect.width) point.vx *= -1;
        if (point.y < 0 || point.y > rect.height) point.vy *= -1;

        // Garder les points dans les limites
        point.x = Math.max(0, Math.min(rect.width, point.x));
        point.y = Math.max(0, Math.min(rect.height, point.y));

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

      // Dessiner les connexions
      pointsRef.current.forEach((point, i) => {
        pointsRef.current.slice(i + 1).forEach(otherPoint => {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.25})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      // Dessiner les points
      pointsRef.current.forEach(point => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'; 
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleZoom);
      window.removeEventListener('orientationchange', handleZoom);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimeout);
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
