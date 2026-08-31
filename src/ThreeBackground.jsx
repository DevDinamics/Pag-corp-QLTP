import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const NeuralNetwork = React.lazy(() => import('./NeuralNetwork'));

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas 
      camera={{ position: [0, 0, isMobile ? 40 : 30], fov: 50 }} 
      dpr={isMobile ? [1, 1] : [1, 1.5]} 
      performance={{ min: 0.5 }}
      gl={{ antialias: false, powerPreference: "high-performance", stencil: false, depth: true }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 60]} /> 
      <Suspense fallback={null}>
        <NeuralNetwork />
        {/* Solo renderizamos el Bloom pesado si NO es móvil */}
        {!isMobile && (
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.4} />
          </EffectComposer>
        )}
      </Suspense>
      <Preload all />
    </Canvas>
  );
}