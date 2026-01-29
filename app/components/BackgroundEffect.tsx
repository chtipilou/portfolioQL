'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const burstRef = useRef<{ x: number; y: number; active: boolean; power: number }>(
    { x: -1000, y: -1000, active: false, power: 0 }
  );
  const pointsRef = useRef<Point[]>([]);
  const frameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const isSmallScreenRef = useRef<boolean>(false);

  const getConfig = useCallback((width: number, height: number) => {
    const isSmall = typeof window !== 'undefined' && window.innerWidth < 768;
    isSmallScreenRef.current = isSmall;

    const area = Math.max(1, width * height);
    const density = isSmall ? 90000 : 70000; // plus élevé = moins de points
    const pointCount = Math.max(16, Math.min(60, Math.floor(area / density)));

    return {
      POINT_COUNT: pointCount,
      CONNECTION_DISTANCE: isSmall ? 90 : 160,
      POINT_SPEED: isSmall ? 1.5 : 2,
      MOUSE_RADIUS: isSmall ? 140 : 200,
      FPS_TARGET: isSmall ? 22 : 28,
      MAX_CONNECTIONS_PER_POINT: isSmall ? 2 : 3,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let config = getConfig(1, 1);
    let FRAME_INTERVAL = 1000 / config.FPS_TARGET;
    let connectionDistanceSquared = config.CONNECTION_DISTANCE * config.CONNECTION_DISTANCE;
    let mouseRadiusSquared = config.MOUSE_RADIUS * config.MOUSE_RADIUS;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const initPoints = () => {
      pointsRef.current = Array.from({ length: config.POINT_COUNT }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: (Math.random() - 0.5) * config.POINT_SPEED,
        vy: (Math.random() - 0.5) * config.POINT_SPEED
      }));
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvasWidth = Math.floor(rect.width);
      canvasHeight = Math.floor(rect.height);
      
      // Rendu net via device pixel ratio
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Reconfigurer pour la nouvelle taille d'écran
      config = getConfig(canvasWidth, canvasHeight);
      FRAME_INTERVAL = 1000 / config.FPS_TARGET;
      connectionDistanceSquared = config.CONNECTION_DISTANCE * config.CONNECTION_DISTANCE;
      mouseRadiusSquared = config.MOUSE_RADIUS * config.MOUSE_RADIUS;
      
      initPoints();
    };

    handleResize();
    
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleThrottledResize = () => {
      if (resizeTimeout) return;
      resizeTimeout = setTimeout(() => {
        handleResize();
        resizeTimeout = null;
      }, 150);
    };
    
    window.addEventListener('resize', handleThrottledResize, { passive: true });

    // Observer la visibilité
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Gestion de la souris avec throttle
    let lastMouseMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMove < 24) return;
      lastMouseMove = now;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Explosion au clic
    const handleClick = (e: MouseEvent) => {
      burstRef.current = { x: e.clientX, y: e.clientY, active: true, power: 260 };
    };
    window.addEventListener('click', handleClick, { passive: true });

    // Animation optimisée
    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - lastFrameTimeRef.current;
      if (elapsed < FRAME_INTERVAL) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      const points = pointsRef.current;
      const len = points.length;
      
      // Mise à jour des positions
      for (let i = 0; i < len; i++) {
        const point = points[i];
        
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvasWidth) point.vx *= -1;
        if (point.y < 0 || point.y > canvasHeight) point.vy *= -1;

        point.x = Math.max(0, Math.min(canvasWidth, point.x));
        point.y = Math.max(0, Math.min(canvasHeight, point.y));

        // Réaction à la souris
        const mdx = mouseRef.current.x - point.x;
        const mdy = mouseRef.current.y - point.y;
        const mdistSq = mdx * mdx + mdy * mdy;

        if (mdistSq < mouseRadiusSquared && mdistSq > 0) {
          const mdist = Math.sqrt(mdistSq);
          const force = (config.MOUSE_RADIUS - mdist) / config.MOUSE_RADIUS * 0.012;
          point.vx += (mdx / mdist) * force;
          point.vy += (mdy / mdist) * force;
        }

        // Explosion au clic
        if (burstRef.current.active) {
          const bdx = point.x - burstRef.current.x;
          const bdy = point.y - burstRef.current.y;
          const bdistSq = bdx * bdx + bdy * bdy;
          if (bdistSq > 0 && bdistSq < 12000000) {
            const bdist = Math.sqrt(bdistSq);
            const power = burstRef.current.power / (bdist + 10);
            point.vx += (bdx / bdist) * power * 0.1;
            point.vy += (bdy / bdist) * power * 0.1;
          }
        }

        // Limiter la vitesse
        const speedSq = point.vx * point.vx + point.vy * point.vy;
        const maxSpeed = burstRef.current.active ? config.POINT_SPEED * 3 : config.POINT_SPEED;
        if (speedSq > maxSpeed * maxSpeed) {
          const speed = Math.sqrt(speedSq);
          point.vx = (point.vx / speed) * maxSpeed;
          point.vy = (point.vy / speed) * maxSpeed;
        }
      }

      if (burstRef.current.active) {
        burstRef.current.power *= 0.88;
        if (burstRef.current.power < 6) {
          burstRef.current.active = false;
        }
      }

      // Dessiner les connexions en batch (limitées par point)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.18)';
      ctx.lineWidth = 1;

      for (let i = 0; i < len; i++) {
        const point = points[i];
        let connections = 0;
        for (let j = i + 1; j < len; j++) {
          const other = points[j];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistanceSquared) {
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            connections++;
            if (connections >= config.MAX_CONNECTIONS_PER_POINT) break;
          }
        }
      }
      ctx.stroke();

      // Dessiner les points en batch
      ctx.beginPath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.55)';
      for (let i = 0; i < len; i++) {
        const point = points[i];
        ctx.moveTo(point.x + 2, point.y);
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
      }
      ctx.fill();

      frameRef.current = requestAnimationFrame(animate);
    };

    lastFrameTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleThrottledResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [getConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ imageRendering: 'auto' }}
    />
  );
};

export default BackgroundEffect;
