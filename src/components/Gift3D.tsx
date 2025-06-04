
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Gift3DProps {
  isOpen: boolean;
  color: string;
  onAnimationComplete?: () => void;
}

export const Gift3D: React.FC<Gift3DProps> = ({ isOpen, color, onAnimationComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const giftBoxRef = useRef<THREE.Group>();
  const lidRef = useRef<THREE.Mesh>();
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Gift box group
    const giftBox = new THREE.Group();
    giftBoxRef.current = giftBox;

    // Box body
    const boxGeometry = new THREE.BoxGeometry(2, 1.5, 2);
    const boxMaterial = new THREE.MeshPhongMaterial({ 
      color: color === 'bg-birthday-pink' ? 0xFF8FB1 : 
             color === 'bg-birthday-turquoise' ? 0x4ECDC4 : 0xFFD93D 
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.y = 0;
    giftBox.add(box);

    // Box lid
    const lidGeometry = new THREE.BoxGeometry(2.2, 0.3, 2.2);
    const lidMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lidRef.current = lid;
    lid.position.y = 0.9;
    giftBox.add(lid);

    // Ribbon
    const ribbonV = new THREE.BoxGeometry(0.2, 2, 2.4);
    const ribbonH = new THREE.BoxGeometry(2.4, 2, 0.2);
    const ribbonMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6B6B });
    
    const ribbonVertical = new THREE.Mesh(ribbonV, ribbonMaterial);
    const ribbonHorizontal = new THREE.Mesh(ribbonH, ribbonMaterial);
    giftBox.add(ribbonVertical);
    giftBox.add(ribbonHorizontal);

    // Bow
    const bowGeometry = new THREE.SphereGeometry(0.3, 8, 6);
    const bowMaterial = new THREE.MeshPhongMaterial({ color: 0xFF6B6B });
    const bow = new THREE.Mesh(bowGeometry, bowMaterial);
    bow.position.set(0, 1.2, 0);
    bow.scale.set(1.5, 0.8, 1);
    giftBox.add(bow);

    scene.add(giftBox);

    // Sparkles
    const sparkles: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const sparkleGeometry = new THREE.SphereGeometry(0.02, 4, 4);
      const sparkleMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
      const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
      
      sparkle.position.set(
        (Math.random() - 0.5) * 6,
        Math.random() * 4,
        (Math.random() - 0.5) * 6
      );
      sparkles.push(sparkle);
      scene.add(sparkle);
    }

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate gift box
      if (giftBox) {
        giftBox.rotation.y += 0.01;
      }

      // Animate sparkles
      sparkles.forEach((sparkle, index) => {
        sparkle.rotation.x += 0.1;
        sparkle.rotation.y += 0.1;
        sparkle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [color]);

  useEffect(() => {
    if (isOpen && !animationStarted && lidRef.current) {
      setAnimationStarted(true);
      
      // Animate lid opening
      const startRotation = 0;
      const endRotation = -Math.PI / 2;
      const startY = 0.9;
      const endY = 2;
      const duration = 1500;
      const startTime = Date.now();

      const animateLid = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        if (lidRef.current) {
          lidRef.current.rotation.x = startRotation + (endRotation - startRotation) * easeProgress;
          lidRef.current.position.y = startY + (endY - startY) * easeProgress;
          lidRef.current.position.z = easeProgress * 1.5;
        }

        if (progress < 1) {
          requestAnimationFrame(animateLid);
        } else if (onAnimationComplete) {
          setTimeout(onAnimationComplete, 500);
        }
      };

      animateLid();
    }
  }, [isOpen, animationStarted, onAnimationComplete]);

  return (
    <div 
      ref={mountRef} 
      className="w-48 h-48 mx-auto"
      style={{ filter: isOpen ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' : 'none' }}
    />
  );
};
