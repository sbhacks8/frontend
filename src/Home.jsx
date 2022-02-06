import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars, Dodecahedron } from "@react-three/drei";
import "./App.css";
import Trajectory from "./components/Trajectory.jsx";
import Overlay from "./components/Overlay.jsx";
import { norm, myeventemitter, mult, rodrigues, theta } from "./utils";
import { DateTime } from "luxon";
import { Vector3 } from "three";

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
    <>
      <directionalLight ref={myLight} position={[-20, 30, 0]} intensity={0.7} />
      <ambientLight intensity={0.03} />
    </>
  );
}

function Meetings() {
  const [thetaMeeting, setTheta] = useState(0.8458134067357136); // more flub, theta offset from beginning

  const [numUpdates, setNumUpdates] = useState(0); // more flub, theta offset from beginning
  const [meetings, _] = useState(() => {
    const saved = localStorage.getItem("backendInfo");
    const backend = JSON.parse(saved);
    const meetings = backend["meetings"];
    //! this is flub, rm for actual later
    for (let meeting of meetings) {
      meeting.theta = theta(meeting.time, backend["flubbedPeriod"]);
      meeting.time = DateTime.local().ts / 1000 + meeting.time;

      let pos = math.add(
        mult(backend["semiMajor"], Math.cos(meeting.theta)),
        mult(backend["semiMinor"], Math.sin(meeting.theta))
      );
      meeting.position = mult(pos, 0.82);
    }

    return meetings || "";
  });
  useFrame(({ camera }, dt) => {
    const saved = localStorage.getItem("backendInfo");
    const backend = JSON.parse(saved);

    let pos = math.add(
      mult(backend["semiMajor"], Math.cos(thetaMeeting)),
      mult(backend["semiMinor"], Math.sin(thetaMeeting))
    );
    pos = mult(pos, 5);
    if (numUpdates < 500) {
      camera.position.lerp(new Vector3(...pos), 0.05);
      camera.lookAt(new Vector3(0, 0, 0));
      camera.updateProjectionMatrix();
      setNumUpdates(numUpdates + 1);
    }
  });
  if (meetings) {
    return (
      <>
        {meetings.map((meeting, i) => {
          // calculate theta, find x, y, z from theta and trajectory
          // make on click effect -> add html element
          // animate time
          // console.log(meeting.position);
          return (
            <Dodecahedron
              onClick={() => {
                setTheta(meeting.theta);
                myeventemitter.emit("newMeeting", meeting);
                setNumUpdates(0);
              }}
              key={i}
              position={meeting.position}
            >
              <meshPhongMaterial attach="material" color="#D8BE99" />
            </Dodecahedron>
          );
        })}
      </>
    );
  } else {
    return null;
  }
}
export default function Home() {
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
          <group>
            <Trajectory />
            <Meetings />
          </group>
          <Earth />
          <Light />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} />
    </>
  );
}
