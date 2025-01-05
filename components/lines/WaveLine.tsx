import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createWavePoints, updateLinePosition } from "@/lib/animation";

interface WaveLineProps {
  index: number;
  color: string;
}

export default function WaveLine({ index, color }: WaveLineProps) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const line = lineRef.current;
    const positions = line.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();

    updateLinePosition(positions, time, index, 0);
    line.geometry.attributes.position.needsUpdate = true;
  });

  const points = createWavePoints(200);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive
      object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color, linewidth: 1, transparent: true, opacity: 0.6 }))}
      ref={lineRef}
    />
  );
}
