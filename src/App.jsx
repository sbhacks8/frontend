import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  forwardRef,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Reflector,
  Text,
  useTexture,
  OrbitControls,
  useGLTF,
  Stars,
} from "@react-three/drei";
import "./App.css";

function Earth(props) {
  const { scene } = useGLTF("earth.glb");
  return <primitive object={scene} {...props} />;
}

export default function App() {
  return (
    <>
      <Canvas
        concurrent
        gl={{ alpha: false }}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 3, 100], fov: 15 }}
      >
        <OrbitControls />
        <Stars />
        <Suspense fallback={null}>
          <Earth
            rotation={[0, Math.PI - 0.4, 0]}
            position={[-1.2, 0, 0.6]}
            scale={[0.26, 0.26, 0.26]}
          />
          
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
        </Suspense>
      </Canvas>
    </>
  );
}
