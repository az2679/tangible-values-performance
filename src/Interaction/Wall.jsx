import { RigidBody } from '@react-three/rapier'

export default function Wall({position, rotation}){
  return (
    <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        <meshBasicMaterial color="#4a4e69" /> 
      </mesh>
    </RigidBody>
  );
}
