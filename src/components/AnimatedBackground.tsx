import React, { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  type: 'circle' | 'triangle' | 'square';
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const AnimatedBackground: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current) return;

    const colors = darkMode 
      ? ['#3ECF8E', '#4FD1FF', '#FF49DB', '#FFB800']
      : ['#3ECF8E', '#2563EB', '#9333EA', '#F59E0B'];

    particlesRef.current = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 0.7),
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      type: ['circle', 'triangle', 'square'][Math.floor(Math.random() * 3)],
      size: Math.random() * 25 + 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.03 + Math.random() * 0.02,
    }));

    let animationFrameId: number;
    let frame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const drawShape = (particle: Particle) => {
      const { x, y, type, size, color, rotation } = particle;
      const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.1;
      const adjustedSize = size * pulseScale;

      let element;
      if (type === 'circle') {
        element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        element.setAttribute('cx', x.toString());
        element.setAttribute('cy', y.toString());
        element.setAttribute('r', (adjustedSize / 2).toString());
      } else if (type === 'square') {
        element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        element.setAttribute('transform', `rotate(${rotation} ${x} ${y})`);
        element.setAttribute('x', (x - adjustedSize / 2).toString());
        element.setAttribute('y', (y - adjustedSize / 2).toString());
        element.setAttribute('width', adjustedSize.toString());
        element.setAttribute('height', adjustedSize.toString());
      } else {
        element = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const points = [
          [x, y - adjustedSize / 2],
          [x + adjustedSize / 2, y + adjustedSize / 2],
          [x - adjustedSize / 2, y + adjustedSize / 2],
        ].map(point => point.join(',')).join(' ');
        element.setAttribute('points', points);
        element.setAttribute('transform', `rotate(${rotation} ${x} ${y})`);
      }

      element.setAttribute('fill', color);
      element.setAttribute('fill-opacity', '0.15');
      element.setAttribute('stroke', color);
      element.setAttribute('stroke-width', '1.5');
      element.setAttribute('stroke-opacity', '0.4');
      
      return element;
    };

    const animate = () => {
      frame++;
      const particles = particlesRef.current;
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > window.innerWidth) particle.dx *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight * 0.7) particle.dy *= -1;

        // Update rotation and pulse
        particle.rotation += particle.rotationSpeed;
        particle.pulsePhase += particle.pulseSpeed;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          const angle = Math.atan2(dy, dx);
          particle.dx += Math.cos(angle) * 0.02;
          particle.dy += Math.sin(angle) * 0.02;
        }

        // Speed limits
        const maxSpeed = 2;
        const speed = Math.sqrt(particle.dx * particle.dx + particle.dy * particle.dy);
        if (speed > maxSpeed) {
          particle.dx = (particle.dx / speed) * maxSpeed;
          particle.dy = (particle.dy / speed) * maxSpeed;
        }
      });

      if (svgRef.current) {
        svgRef.current.innerHTML = '';

        // Draw connections
        particles.forEach((particle1, i) => {
          particles.slice(i + 1).forEach(particle2 => {
            const distance = Math.hypot(particle2.x - particle1.x, particle2.y - particle1.y);
            if (distance < 180) {
              const opacity = (1 - distance / 180) * 0.3;
              const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
              const gradientId = `gradient-${particle1.id}-${particle2.id}-${frame}`;
              gradient.setAttribute('id', gradientId);
              
              const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
              stop1.setAttribute('offset', '0%');
              stop1.setAttribute('stop-color', particle1.color);
              
              const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
              stop2.setAttribute('offset', '100%');
              stop2.setAttribute('stop-color', particle2.color);
              
              gradient.appendChild(stop1);
              gradient.appendChild(stop2);
              svgRef.current.appendChild(gradient);
              
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              line.setAttribute('x1', particle1.x.toString());
              line.setAttribute('y1', particle1.y.toString());
              line.setAttribute('x2', particle2.x.toString());
              line.setAttribute('y2', particle2.y.toString());
              line.setAttribute('stroke', `url(#${gradientId})`);
              line.setAttribute('stroke-width', '1');
              line.setAttribute('stroke-opacity', opacity.toString());
              svgRef.current.appendChild(line);
            }
          });
        });

        // Draw particles
        particles.forEach(particle => {
          const shape = drawShape(particle);
          svgRef.current?.appendChild(shape);
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (svgRef.current) {
        svgRef.current.setAttribute('width', window.innerWidth.toString());
        svgRef.current.setAttribute('height', (window.innerHeight * 0.7).toString());
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-[70vh] -z-10"
      style={{ minHeight: '500px' }}
    />
  );
};

export default AnimatedBackground;