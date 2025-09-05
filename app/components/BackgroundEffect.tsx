'use client';

import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Orb {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const orbsRef = useRef<Orb[]>([]);

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

      // Définir la taille du canvas en CSS pixels (garder simple pour éviter artefacts au zoom)
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Réinitialiser les points si nécessaire
      if (
        pointsRef.current.length === 0 ||
        pointsRef.current.length !== POINT_COUNT
      ) {
        pointsRef.current = Array.from({ length: POINT_COUNT }, () => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * POINT_SPEED,
          vy: (Math.random() - 0.5) * POINT_SPEED
        }));
      }

      // (Re)créer quelques orbes décoratifs
      if (orbsRef.current.length === 0) {
        const colors = ['70,130,180', '99,102,241', '59,130,246'];
        orbsRef.current = Array.from({ length: 6 }, () => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          r: 40 + Math.random() * 90,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          alpha: 0.06 + Math.random() * 0.12,
          color: colors[Math.floor(Math.random() * colors.length)]
        }));
      }
    };

    handleResize();

    // Utiliser un debounce sur resize/zoom pour réinitialiser proprement
    let resizeTimeout: number | null = null;
    const scheduleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        handleResize();
        resizeTimeout = null;
      }, 120);
    };

    window.addEventListener('resize', scheduleResize);
    window.addEventListener('orientationchange', scheduleResize);

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

      // Orbs décoratifs (très subtils)
  orbsRef.current.forEach((orb: Orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.r) orb.x = rect.width + orb.r;
        if (orb.x > rect.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = rect.height + orb.r;
        if (orb.y > rect.height + orb.r) orb.y = -orb.r;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      });

      // dessine les points (avec types explicites)
      pointsRef.current.forEach((point: Point) => {
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
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

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
      pointsRef.current.forEach((point: Point, i: number) => {
        pointsRef.current.slice(i + 1).forEach((otherPoint: Point) => {
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
      pointsRef.current.forEach((point: Point) => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'; 
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', scheduleResize);
      window.removeEventListener('orientationchange', scheduleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
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
