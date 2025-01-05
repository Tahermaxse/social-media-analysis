import * as THREE from 'three';

export const createWavePoints = (count: number) => {
  return new Array(count).fill(0).map((_, i) => {
    const x = (i / count) * 20 - 10;
    return new THREE.Vector3(x, 0, 0);
  });
};

export const updateLinePosition = (
  positions: Float32Array,
  time: number,
  index: number,
  mouseY: number
) => {
  for (let i = 0; i < positions.length; i += 3) {
    const x = (i / positions.length) * 20 - 10;
    const phase = index * Math.PI * 0.2;
    
    const y = Math.sin(x * 0.2 + time + phase) * 0.3 +
              Math.sin(x * 0.1 + time * 0.5 + phase) * 0.3 +
              Math.sin(x * 0.15 + time * 0.3 + phase) * 0.2 +
              mouseY * 0.1;
    
    positions[i] = x;
    positions[i + 1] = y;
    positions[i + 2] = 0;
  }
};

// AstraCS:kgDvZpwmhGgtYuMoisuKrpHk:96a31c593f945b3fa9227e3210c1379d48aa684e43c9bde19aa35ca78d895158