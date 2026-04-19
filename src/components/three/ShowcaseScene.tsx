import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

interface Props {
  scrollProgress?: number;
  shape?: "torus" | "icosahedron" | "knot";
  color?: string;
}

function Shape({ scrollProgress = 0, shape = "torus", color = "#7c4dff" }: Props) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.2 + scrollProgress * Math.PI;
    ref.current.rotation.y = t * 0.3 + scrollProgress * Math.PI * 0.5;
    ref.current.scale.setScalar(1 + scrollProgress * 0.2);
  });

  const geo =
    shape === "knot" ? (
      <torusKnotGeometry args={[0.9, 0.3, 200, 32]} />
    ) : shape === "icosahedron" ? (
      <icosahedronGeometry args={[1.2, 4]} />
    ) : (
      <torusGeometry args={[1, 0.35, 32, 100]} />
    );

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref}>
        {geo}
        <MeshTransmissionMaterial
          color={color}
          thickness={0.6}
          roughness={0.1}
          transmission={0.9}
          ior={1.4}
          chromaticAberration={0.05}
          backside
        />
      </mesh>
    </Float>
  );
}

const ShowcaseScene = ({ scrollProgress = 0, shape = "torus", color }: Props) => (
  <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#b794ff" />
      <Environment preset="studio" />
      <Shape scrollProgress={scrollProgress} shape={shape} color={color} />
    </Suspense>
  </Canvas>
);

export default ShowcaseScene;
