import React, { useState } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useCubeTexture, Float } from '@react-three/drei';
import { useEffect } from 'react';

import Prompt from './Text/Prompt';
import Text from './Text/Text';

export default function Thought({position, meshPos, startDialogue, startPosition, updateDialogue, updatePosition, endDialogue, endPosition, prompt, promptPosition, onInstructionStateChange, proximityState, onProximity, children, submissions}) {
  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    {path: "./textures/sky/"}
    )
  
  const [instructionState, setInstructionState] = useState(false);
  const [dialogueState, setDialogueState] = useState(false);
  const [dialogue, setDialogue] = useState(startDialogue)
  const [dialoguePosition, setDialoguePosition] = useState(startPosition)

  useEffect(() => {
    React.Children.forEach(children, (child, key) => {
      const childKey = child.key;
      const submissionValue = submissions && submissions[childKey];
      if (submissionValue === true) {
        setDialogue(endDialogue);
        setDialoguePosition(endPosition);
      }
    });
  }, [submissions, children]);

  return (
    <>
      <RigidBody name = "thought" mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
        <Float
        speed={1} 
        rotationIntensity={0} 
        floatIntensity={2} 
        floatingRange={[-1, 1]}
        >
          <mesh position={meshPos ? meshPos : [0, 6, 0]}>
            <octahedronGeometry args={[8]} />
            <meshBasicMaterial color={"#9a8c98"} 
            // wireframe
            // wireframeLinewidth={20}
            // envMap={texture} 
            // reflectivity={1}
            />
          </mesh>
        </Float>
          <Text position={dialoguePosition} text={dialogue} state={dialogueState} scale={[2, 2, 3]} rotation={[-Math.PI*0.1, 0, 0]}/>
          <Prompt position={promptPosition ? promptPosition : [0, 30, -10]} prompt={prompt} state={instructionState} />
          <CapsuleCollider args={[5, 200, 5]} sensor position={[0, 0, 40]}
            onIntersectionEnter={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
              setDialogueState(true)
              }
            }} 
            onIntersectionExit={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
              setInstructionState(false)
              onInstructionStateChange(false)
              onProximity(false)
              setDialogueState(false)
              }
            }} />
            <CapsuleCollider args={[5, 30, 5]} sensor position={meshPos ? meshPos : [0,0,0]}
            onIntersectionEnter={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
                setInstructionState(true)
                onInstructionStateChange(true)
                setDialogueState(false)
                setDialogue(updateDialogue)
                setDialoguePosition(updatePosition)
              }
            }} 
            onIntersectionExit={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
                setInstructionState(false)
                onInstructionStateChange(false)
                setDialogueState(true)
              }
            }} 
          />
      </RigidBody>
      <mesh position={[position[0], position[1]-4.8, position[2]+40]} rotation={[-Math.PI/2, 0, 0]} >
        <ringGeometry args={[198, 202, 64, 1]} />
        <meshBasicMaterial color="#c9ada7"/>
      </mesh>
      {children}
    </>
);
}