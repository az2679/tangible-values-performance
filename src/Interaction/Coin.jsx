import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { CylinderCollider, RigidBody } from "@react-three/rapier";

import gsap from 'gsap';

export default function Coin({ position, onSendCoin, sendPos, delay, payoutState }) {
  const { nodes } = useGLTF('/tangible-values/models/coin.glb')
  const [coinPos, setCoinPos] = useState([position[0], position[1], position[2]])
  const coinRef = useRef()

  useEffect(()=> {
    if (payoutState == true){
      const tl = gsap.timeline();
      gsap.killTweensOf(coinRef.current.parent.position);
      
      tl.to(coinRef.current.parent.position, {
        x: sendPos[0],
        y: sendPos[1], 
        z: sendPos[2], 
        duration: 2, 
        delay: delay+5,
        ease: "power2.inOut",
        onUpdate: () => {
          setCoinPos([...coinRef.current.parent.position]);
        }
      })
    }
  }, [payoutState])


  return (
    <>
      <RigidBody mass={1} type="dynamic" colliders={false} position={coinPos} canSleep={false} >
        <CylinderCollider args={[0.5, 2]}  />
        <mesh ref = {coinRef} scale={2} geometry={nodes.Object_2001.geometry}>
          <meshBasicMaterial color="#22223b"/>
        </mesh>
      </RigidBody>
    </>
  );
}