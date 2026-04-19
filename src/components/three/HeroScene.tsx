import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const PURPLE = "#7c4dff";
const PURPLE_LIGHT = "#b794ff";

function FloatingShape({
  position,
  scale = 1,
  geometry = "sphere",
  color = PURPLE,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  geometry?: "sphere" | "torus" | "icosahedron" | "box";
  color?: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });

  const geo = (() => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[0.7, 0.25, 32, 100]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 4]} />;
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      default:
        return <sphereGeometry args={[1, 64, 64]} />;
    }
  })();

  return (
    <Float speed={1.2 * speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        {geo}
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.4}
          distort={0.35}
          speed={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function MouseParallax() {
  useFrame((state) => {
    state.camera.position.x += (state.mouse.x * 0.6 - state.camera.position.x) * 0.04;
    state.camera.position.y += (state.mouse.y * 0.4 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const HeroScene = () => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [0, 0, 6], fov: 45 }}
    gl={{ antialias: true, alpha: true }}
    style={{ background: "transparent" }}
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color={PURPLE_LIGHT} />
      <pointLight position={[-3, -2, 2]} intensity={1.2} color={PURPLE} />
      <Environment preset="city" />

      <FloatingShape position={[0, 0.3, 0]} scale={1.6} geometry="icosahedron" color={PURPLE_LIGHT} />
      <FloatingShape position={[-2.2, 1, -1]} scale={0.55} geometry="sphere" color={PURPLE} speed={0.8} />
      <FloatingShape position={[2.4, -0.8, -0.5]} scale={0.7} geometry="torus" color={PURPLE_LIGHT} speed={1.2} />
      <FloatingShape position={[2, 1.6, -2]} scale={0.4} geometry="box" color={PURPLE} speed={1.5} />
      <FloatingShape position={[-2.5, -1.2, -1.5]} scale={0.45} geometry="icosahedron" color={PURPLE_LIGHT} speed={0.9} />

      <ContactShadows position={[0, -2.2, 0]} opacity={0.25} blur={2.4} far={4} />
      <MouseParallax />

      <EffectComposer>
        <Bloom luminanceThreshold={0.4} intensity={0.6} mipmapBlur />
      </EffectComposer>
    </Suspense>
  </Canvas>
);

export default HeroScene;
