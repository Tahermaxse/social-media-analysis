"use client";

import WaveLine from './WaveLine';

const COLORS = ['#ffb4b4', '#ff9b9b', '#ff8282', '#ff6969', '#ff5050'];

export default function WaveLines() {
  return (
    <>
      {COLORS.map((color, index) => (
        <WaveLine key={index} index={index} color={color} />
      ))}
    </>
  );
}