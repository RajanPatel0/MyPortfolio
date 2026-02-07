
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { Suspense } from "react";

const Stars = () => {
  const ref = useRef();

  const positions = useMemo(() => {
    const array = new Float32Array(5000 * 3);
    random.inSphere(array, { radius: 1.2 });
    return array;
  }, []);

  useEffect(() => {
    const hasNaN = positions.some((v) => isNaN(v));
    // console.log(hasNaN ? "❌ NaN found" : "✅ Star positions are valid.");
  }, [positions]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <points ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f272c8"
        size={0.002}
        sizeAttenuation
        depthWrite={false}
        transparent
      />
    </points>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-full fixed inset-0 z-[-1]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
    </Canvas>
  </div>
);



export default StarsCanvas;


