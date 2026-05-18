import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Building({ position, height, width, depth, color }: { 
  position: [number, number, number]; 
  height: number; 
  width: number;
  depth: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + height / 2 + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], height / 2, position[2]]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8} 
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function CityGrid() {
  const buildings = useMemo(() => {
    const arr = [];
    for (let x = -12; x <= 12; x += 3) {
      for (let z = -12; z <= 12; z += 3) {
        const height = Math.random() * 3 + 1;
        const width = Math.random() * 1 + 0.5;
        const depth = Math.random() * 1 + 0.5;
        const colorOptions = ['#1a365d', '#1e3a5f', '#234567', '#0d2137', '#142d4c'];
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        arr.push({ position: [x, 0, z] as [number, number, number], height, width, depth, color, key: `${x}-${z}` });
      }
    }
    return arr;
  }, []);

  return (
    <>
      {buildings.map((b) => (
        <Building key={b.key} {...b} />
      ))}
    </>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial 
        color="#0a1929" 
        metalness={0.5} 
        roughness={0.8}
      />
    </mesh>
  );
}

function RotatingCamera() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime * 0.08;
    camera.position.x = Math.sin(t) * 20;
    camera.position.z = Math.cos(t) * 20;
    camera.position.y = 12 + Math.sin(clock.elapsedTime * 0.3) * 2;
    camera.lookAt(0, 2, 0);
  });
  return null;
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        color="#00ffff" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050a15']} />
      <fog attach="fog" args={['#050a15', 15, 50]} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={0.5} color="#00ffff" />
      <pointLight position={[0, 10, 0]} intensity={1} color="#00ffff" distance={40} />
      
      <RotatingCamera />
      
      <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
        <CityGrid />
      </Float>
      
      <Ground />
      <FloatingParticles />
      
      <Stars 
        radius={80} 
        depth={40} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
    </>
  );
}

export default function CityScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [20, 12, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
