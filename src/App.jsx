import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text, Stars } from "@react-three/drei";
import "./App.css";
import Trajectory from "./components/Trajectory.jsx";
import Overlay from "./components/Overlay.jsx";
import { norm } from "./utils";

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
    setShiftEarth(clock.getElapsedTime() / 5);
  });
  return (
    <primitive
      rotation={[0, Math.PI + shiftEarth, 0]}
      position={[0, 0, 0]}
      scale={[0.1, 0.1, 0.1]}
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
  norm(planeVector);
  useFrame(({ camera, clock }) => {
    let newPos = rodrigues(theta(clock.getElapsedTime(), 100), a, planeVector);

    myLight.current.position.x = newPos[0];
    myLight.current.position.y = newPos[1];
    myLight.current.position.z = newPos[2];
  });

  return (
    <directionalLight ref={myLight} position={[-20, 30, 0]} intensity={0.7} />
  );
}

function Meetings() {
  const [meetings, _] = useState(() => {
    const saved = localStorage.getItem("name");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  return (
    <div>
      {meetings.map((meeting, i) => {
        // calculate theta, find x, y, z from theta and trajectory
        // make on click effect -> add html element
        // animate time
        <div> {i}</div>;
      })}
    </div>
  );
}
export default function App() {
  const overlay = useRef();
  return (
    <>
      <Canvas
        concurrent
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 100], fov: 15 }}
      >
        <OrbitControls />
        <Stars />
        <Suspense fallback={null}>
          <Trajectory />
          <Meetings />
          <Earth />
          <Light />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} />
    </>
  );
}
