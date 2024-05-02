import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { MeshReflectorMaterial } from '@react-three/drei';
import { GradientTexture } from '@react-three/drei';


export default function Ground({color}) {
  return (
    <>
      <RigidBody type="fixed" colliders={false} name="ground">
        <mesh position={[0,0,-500]} rotation={[-Math.PI/2, 0, 0]} >
          <planeGeometry args={[3000, 3000]} />
          {/* <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={20}
            depthScale={1}
            minDepthThreshold={0.85}
            color=  "#e6e6e6"
            metalness={0.6}
            roughness={1}>
          </MeshReflectorMaterial> */}
            <meshBasicMaterial color={"#edd3c5"}/>
        </mesh>
        <CuboidCollider args={[5000, 1, 5000]} position={[0, 0, 0]} />
      </RigidBody>
    </>
);
}