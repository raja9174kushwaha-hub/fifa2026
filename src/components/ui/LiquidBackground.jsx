'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, Sphere, ContactShadows } from '@react-three/drei';

function LiquidSphere() {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t / 4) / 2;
      mesh.current.rotation.y = t / 4;
      mesh.current.position.y = Math.sin(t / 2) / 2;
    }
  });

  return (
    <Float floatIntensity={2} speed={2}>
      <mesh ref={mesh} position={[0, 0, 0]} scale={2.5}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={1.5} 
          roughness={0.1}
          transmission={1} 
          ior={1.3}
          chromaticAberration={0.06} 
          anisotropy={0.1}
          distortion={0.5} 
          distortionScale={0.3} 
          temporalDistortion={0.1}
          color="#3b82f6" 
          attenuationDistance={0.5}
          attenuationColor="#ffffff" 
        />
      </mesh>
    </Float>
  );
}

export default function LiquidBackground() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        
        <LiquidSphere />
        
        {/* Subtle environment lighting to reflect off the glass */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
