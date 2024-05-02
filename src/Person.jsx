// key control reference: Minecraft by drcmda
// https://codesandbox.io/p/sandbox/minecraft-vkgi6?file=%2Fsrc%2FPlayer.js%3A24%2C5-24%2C60

import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls, useCubeTexture } from "@react-three/drei";
import { RigidBody, BallCollider } from '@react-three/rapier';

import About from './Components/About';

const SPEED = 100;
const frontVector = new Vector3();
const sideVector = new Vector3();
const direction = new Vector3();

export default function Person({ position, onPositionChange, onProximity, onThoughtPosition, submissions, sendProximityToThoughts }) {
  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    {path: "./envmap/"}
    )

  const ref = useRef();
  const [, get] = useKeyboardControls();
  const [aboutPosition, setAboutPosition] = useState([0, 0, 0]);

  // const thoughts = [new Vector3(0, 0, -275), new Vector3(-510, 5, -730), new Vector3(0, 0, -1010), new Vector3(510, 5, -730)];
  // const [distanceToThoughts, setDistanceToThoughts] = useState([0, 0, 0, 0]);

  useFrame(() => {
    const { forward, backward, left, right } = get()
    const velocity = ref.current.linvel();

    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)

    direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
    ref.current.setLinvel({x:direction.x, y: velocity.y, z:direction.z})

    const spherePosition = ref.current.translation();
    onPositionChange({
      x: spherePosition.x,
      y: spherePosition.y,
      z: spherePosition.z,
    })

    //distance based rendering
  //   const spherePosVec = new Vector3(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);
  //   const newDistance = thoughts.map(thought => spherePosVec.distanceTo(new Vector3(...thought)));
  //   setDistanceToThoughts(newDistance);
  //   const proximityToThoughts = distanceToThoughts.map(distance => distance < 250);
  //   sendProximityToThoughts(proximityToThoughts);
  });

  

  const handleThoughtPosition = (thoughtPosition) => {
    onThoughtPosition({
      x: thoughtPosition.x, 
      y: thoughtPosition.y + 30, 
      z: thoughtPosition.z + 20
    })
  }

  // useEffect(()=>{
  //   setAboutPosition([ref.current.translation().x, 0, ref.current.translation().z-50])
  // },[submissions])

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setAboutPosition([ref.current.translation().x, 0, ref.current.translation().z-50])
    if (submissions && Object.keys(submissions).length > 0) {
      if(Object.values(submissions).every((value) => value === true)){
        setTimeout(() => {
          setComplete(true);
        }, 10000);
      }
    }
    console.log(submissions, complete)
  }, [submissions]);

  return (
    <>
      <RigidBody ref={ref} mass={20} gravityScale={20} type="Dynamic" position={position ? position : [0, 100, 150]} scale={5} colliders="ball" canSleep={false} name="person">
        <mesh name="person">
          <sphereGeometry />
          <meshBasicMaterial color={"#90645A"} 
          wireframe={false}
          // envMap={texture} reflectivity={1}
          />
        </mesh>
        <BallCollider args={[1.1, 1.1, 1.1]} sensor 
            onIntersectionEnter={(payload) => {
            if(payload.other.rigidBodyObject.name == "thought"){
            onProximity(true)
            handleThoughtPosition(payload.other.rigidBodyObject.position)
            }
          }} 
          onIntersectionExit={() => {
          }
          } 
        />
      </RigidBody>

      {complete && <About position={aboutPosition}/>}
    </>
  );
}
