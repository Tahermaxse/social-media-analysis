"use client";

import { Canvas } from '@react-three/fiber';
import WaveLines from '@/components/lines/WaveLines';

export default function WaveAnimation() {
  return (
    <div className="sticky top-0 left-0 w-full h-[40vh] ">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        className="!absolute top-0 left-0 w-full h-full"
      >
        <WaveLines />
      </Canvas>
    </div>
  );
}