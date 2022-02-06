import React from "react";
import { useAuth0 } from '@auth0/auth0-react'
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import * as THREE from 'three'

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars } from "@react-three/drei";
import { softShadows, BakeShadows, RoundedBox, Environment, useCursor } from '@react-three/drei'
import { Loader } from "@react-three/drei"
// import {useSpring, useChain, animated} from 'react-spring'
// import {
//   useTransition,
//   useSpring,
//   useChain,
//   config,
//   animated,
//   useSpringRef,
// } from '@react-spring/web'

import "./App.css";

const PERIOD = 100;

softShadows()

// function damp(target, to, step, delta, v = new THREE.Vector3()) {
//   if (target instanceof THREE.Vector3) {
//     target.x = THREE.MathUtils.damp(target.x, to[0], step, delta)
//     target.y = THREE.MathUtils.damp(target.y, to[1], step, delta)
//     target.z = THREE.MathUtils.damp(target.z, to[2], step, delta)
//   }
// }

function LiftOff() {
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    if (clock.getElapsedTime() <= 2){ 
      camera.position.z = 0 + (clock.getElapsedTime()+3)*20;
    }
  })
  return null
}
function Dolly() {
  useFrame((state) => {
    // console.log(state.camera.position)
    state.camera.position.z = 50 + math.sin(state.clock.getElapsedTime()) * 30
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
  })
  return null
}
function Button({ v = new THREE.Vector3(), c = new THREE.Color() }) {
  const material = useRef()
  const [active, setActive] = useState(false)
  const [zoom, set] = useState(true)
  useCursor(active)
  // useFrame((state, delta) => {
  //   const step = 4
  //   // state.camera.fov = THREE.MathUtils.damp(state.camera.fov, zoom ? 10 : 42, step, delta)
  //   damp(state.camera.position, [zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10], step, delta)
  //   state.camera.lookAt(0, 0, 0)
  //   state.camera.updateProjectionMatrix()
  // })
  return (
    <mesh receiveShadow castShadow onClick={() => set(!zoom)} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
      <sphereGeometry args={[0.3, 24, 24]} />
      <meshPhysicalMaterial
        ref={material}
        clearcoat={1}
        clearcoatRoughness={0}
        transmission={1}
        thickness={1.1}
        roughness={0}
        envMapIntensity={2}
      />
    </mesh>
  )
}
function ZoomOut() {
  const vec = new THREE.Vector3(0, 0, 30)
  return useFrame(({ camera }) => {camera.position.lerp(vec, 0.1)});
}
function ZoomIn() {
  const vec = new THREE.Vector3(0, 0, 30)
  return useFrame(({ camera }) => {camera.position.lerp(vec, 0.1)});
}

function Person () {
  const { scene } = useGLTF("waving.glb");
  return (
    <primitive
      // rotation={[0, Math.PI + shiftEarth, 0]}
      position={[0, 0, 0]}
      scale={[0.03, 0.03, 0.03]}
      object={scene}
      // {...props}
    />
  );
}
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
      setShiftEarth((clock.getElapsedTime() - 2)/ 4);
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

  // const c = [0, 0, 35];
  // let k = [-1/math.sqrt(9), 1/math.sqrt(9), -1/math.sqrt(9)];
  // let k = [0,1,0];
  useFrame(({ clock, camera }) => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix()
    // if ((clock.getElapsedTime() >= 6) && (clock.getElapsedTime() <= 14)) {
    //   let newPosition = rodrigues(theta(clock.getElapsedTime()-6, 8), c, k);
    //   camera.position.x = newPosition[0];
    //   camera.position.y = newPosition[1];
    //   camera.position.z = newPosition[2];
    // }
    if (clock.getElapsedTime() > 4) {
      camera.position.lerp(new THREE.Vector3(0, 0, 35), 0.01);
    }
  });

  return (
    <directionalLight ref={myLight} position={[-20, 30, 0]} intensity={0.7} />
  );
}

function Landing() {
  const {loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently} = useAuth0()

  function callApi() {
    axios
      .get("http://localhost:4000/")
      .then(response => console.log(response.data))
      .catch(error => console.log(error.message))
  }
  async function callProtectedApi() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div className="Auth">
      <h1>Timely</h1>
      <ul>
        <li>
          <button onClick={loginWithPopup}>Login With Popup</button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>Login With Redirect</button>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <p>You are { isAuthenticated ? "Logged in" : "Logged Out"}</p>

      <ul>
        <li><button onClick={callApi}>Call API</button></li>
        <li><button onClick={callProtectedApi}>Call Protected API</button></li>
      </ul>

      { isAuthenticated && (<pre styled={{ textAlign: 'start' }}>{JSON.stringify(user, null, 2)}</pre> )}
      <>
      <Canvas
        concurrent
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 100], fov: 15 }}
      >
        {/* <OrbitControls /> */}
        <Stars />
        <Suspense fallback={null}>
          <Earth />
          <Light />
        </Suspense>
      </Canvas>
    </>
    </div>
  )
};

export default Landing