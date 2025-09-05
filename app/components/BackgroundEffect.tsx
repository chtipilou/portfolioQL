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
  // Ajout de refs pour optimisation
  const frameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Configuration
    const POINT_COUNT = 60; 
    const CONNECTION_DISTANCE = 150;
    const POINT_SPEED = 1.5;
    const MOUSE_RADIUS = 250;
    const FPS_TARGET = 30; // Limiter à 30 FPS pour économiser les ressources
    const FRAME_INTERVAL = 1000 / FPS_TARGET;
    const RESIZE_THRESHOLD = 100; // Seuil pour la réinitialisation des points

    // Cache des calculs fréquemment utilisés
    let canvasWidth = 0;
    let canvasHeight = 0;
    let connectionDistanceSquared = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
    let mouseRadiusSquared = MOUSE_RADIUS * MOUSE_RADIUS;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      
      // Stocker les dimensions pour éviter de recalculer
      canvasWidth = Math.floor(rect.width);
      canvasHeight = Math.floor(rect.height);
      
      // Définir la taille du canvas
      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Réinitialiser les points uniquement si nécessaire
        if (pointsRef.current.length === 0 || 
            Math.abs(canvasWidth - (pointsRef.current[0]?.x || 0)) > RESIZE_THRESHOLD ||
            Math.abs(canvasHeight - (pointsRef.current[0]?.y || 0)) > RESIZE_THRESHOLD) {
          pointsRef.current = Array.from({ length: POINT_COUNT }, () => ({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            vx: (Math.random() - 0.5) * POINT_SPEED,
            vy: (Math.random() - 0.5) * POINT_SPEED
          }));
        }
      }
    };

    handleResize();
    
    // Écouter les changements de taille avec throttling
    let resizeTimeout: NodeJS.Timeout;
    const handleThrottledResize = () => {
      if (resizeTimeout) return; // Éviter les appels multiples pendant le resize
      resizeTimeout = setTimeout(() => {
        handleResize();
        resizeTimeout = null as unknown as NodeJS.Timeout;
      }, 100);
    };
    
    window.addEventListener('resize', handleThrottledResize);
    window.addEventListener('orientationchange', handleThrottledResize);

    // Observer la visibilité de la page pour pauser l'animation quand non visible
    if (typeof document !== 'undefined' && 'visibilityState' in document) {
      const handleVisibilityChange = () => {
        isVisibleRef.current = document.visibilityState === 'visible';
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    // Suit la position de la souris avec throttling
    let lastMouseMoveTime = 0;
    const MOUSE_THROTTLE = 16; // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseMoveTime < MOUSE_THROTTLE) return;
      
      lastMouseMoveTime = now;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation background optimisée avec requestAnimationFrame
    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        // Si l'onglet n'est pas visible, ralentir l'animation
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Limiter le framerate pour économiser les ressources
      const elapsed = timestamp - lastFrameTimeRef.current;
      if (elapsed < FRAME_INTERVAL) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessine les points avec optimisation
      pointsRef.current.forEach((point: Point) => {
        // Déplacement
        point.x += point.vx;
        point.y += point.vy;

        // Rebond sur les bords optimisé
        if (point.x < 0 || point.x > canvasWidth) point.vx *= -1;
        if (point.y < 0 || point.y > canvasHeight) point.vy *= -1;

        // Garder les points dans les limites
        point.x = Math.max(0, Math.min(canvasWidth, point.x));
        point.y = Math.max(0, Math.min(canvasHeight, point.y));

        // Réaction à la souris avec optimisation des calculs de distance
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < mouseRadiusSquared) {
          const distance = Math.sqrt(distanceSquared);
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          const factor = force * 0.02;
          
          if (distance > 0) { // Éviter division par zéro
            point.vx += (dx / distance) * factor;
            point.vy += (dy / distance) * factor;
          }
        }

        // Limiter la vitesse avec optimisation
        const speedSquared = point.vx * point.vx + point.vy * point.vy;
        if (speedSquared > POINT_SPEED * POINT_SPEED) {
          const speed = Math.sqrt(speedSquared);
          point.vx = (point.vx / speed) * POINT_SPEED;
          point.vy = (point.vy / speed) * POINT_SPEED;
        }
      });

      // Dessiner les connexions avec optimisation
      pointsRef.current.forEach((point: Point, i: number) => {
        const remainingPoints = pointsRef.current.slice(i + 1);
        for (let j = 0; j < remainingPoints.length; j++) {
          const otherPoint = remainingPoints[j];
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < connectionDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.25})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        }
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    // Initialisation de l'animation
    lastFrameTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      // Nettoyer les événements et l'animation
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      window.removeEventListener('resize', handleThrottledResize);
      window.removeEventListener('orientationchange', handleThrottledResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (typeof document !== 'undefined' && 'visibilityState' in document) {
        document.removeEventListener('visibilitychange', 
          () => { isVisibleRef.current = document.visibilityState === 'visible'; });
      }
      
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
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
