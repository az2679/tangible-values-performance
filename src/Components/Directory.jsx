import Label from '../Text/Label'
import Path from './Path'

export default function Directory({submitted}){
  return(
    <>
      <Label text={"DICTATOR GAME"} position={[0,5,-450]} rotation={[0,0,0]} scale={3} state={!submitted} />
      <Label text={"VOLUNTEER'S DILEMMA"} position={[-220,5,-550]} rotation={[0,Math.PI*0.25,0]} scale={3} state={submitted} />
      <Label text={"EXCHANGE GAME"} position={[0,5,-650]} rotation={[0,0,0]} scale={3} state={submitted} />
      <Label text={"TRUST GAME"} position={[220,5,-550]} rotation={[0,-Math.PI*0.25,0]} scale={3} state={submitted} />


      <Path position={[235,25,-500]} i={1} rotation={[0,Math.PI*0.25,0]} state = {submitted} />
      <Path position={[235,25,-600]} i={-1} rotation={[0,Math.PI*0.25,0]} state = {submitted} />

      <Path position={[0,25,-600]} i={-1} rotation={[0,0,0]} state = {submitted}/>
      <Path position={[0,25,-700]} i={1} rotation={[0,0,0]} state = {submitted} />

      <Path position={[-235,25,-500]} i={-1} rotation={[0,-Math.PI*0.25,0]} state = {submitted} />
      <Path position={[-235,25,-600]} i={1} rotation={[0,-Math.PI*0.25,0]} state = {submitted} />
    </>
  )
}