import axios from "axios";

import "./Landing.css";
import * as THREE from "three";

import React, { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars } from "@react-three/drei";
import { softShadows } from "@react-three/drei";
import { Loader } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

import "./App.css";

softShadows();

function mult(array, v) {
  return array.map((x) => x * v);
}
function rodrigues(theta, v, k) {
  return math.add(
    mult(v, Math.cos(theta)),
    mult(math.cross(k, v), Math.sin(theta)),
    mult(k, math.dot(k, v) * (1 - Math.cos(theta)))
  );
}
function theta(time, period) {
  return (2 * Math.PI * (time % period)) / period;
}
function Earth(props) {
  const { scene } = useGLTF("earth.glb");
  const [shiftEarth, setShiftEarth] = useState(0);

  useFrame(({ clock }) => {
    if (clock.getElapsedTime() >= 2) {
      setShiftEarth((clock.getElapsedTime() - 2) / 4);
    }
  });
  return (
    <primitive
      rotation={[0, Math.PI + shiftEarth, 0]}
      position={[0, 0, 0]}
      scale={[0.03, 0.03, 0.03]}
      object={scene}
      {...props}
    />
  );
}
function Light() {
  const myLight = React.useRef();

  const a = [-20, 30, 0];
  const b = [0, 0, -20];
  let planeVector = math.cross(a, b);
  planeVector = planeVector.map((v) => {
    return v / math.norm(planeVector);
  });
  useFrame(({ clock }) => {
    let newPos = rodrigues(theta(clock.getElapsedTime(), 20), a, planeVector);

    myLight.current.position.x = newPos[0];
    myLight.current.position.y = newPos[1];
    myLight.current.position.z = newPos[2];
  });

  useFrame(({ clock, camera }) => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    if (clock.getElapsedTime() > 2) {
      camera.position.lerp(new THREE.Vector3(0, 0, 35), 0.05);
    }
  });

  return (
    <directionalLight ref={myLight} position={[-20, 30, 0]} intensity={0.7} />
  );
}

function Landing(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="Auth">
        <h1 className="title">Timely</h1>
        <button className="login-button" onClick={() => navigate("/home")}>
          Login
        </button>
      </div>
      <Canvas
        concurrent
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 1000], fov: 15 }}
      >
        {/* <OrbitControls /> */}
        <Stars />
        <Suspense fallback={null}>
          {/* <ZoomIn /> */}
          <Earth />
          {/* <ZoomOut /> */}
          <Light />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default Landing;
