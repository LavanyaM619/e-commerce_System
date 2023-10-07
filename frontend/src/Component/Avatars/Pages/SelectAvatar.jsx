import {Canvas,useFrame} from '@react-three/fiber'
import React, { useRef, useState ,Suspense} from "react";
import { OrbitControls ,Gl, Gltf,Environment, Center, useGLTF,PresentationControls } from '@react-three/drei' 
import Villan from '../Avatars/Villan';
import Girl from '../Avatars/Girl';
import Girl2 from '../Avatars/Girl2';
import Mafia from '../Avatars/Mafia';
import RedShirt from '../Avatars/Redtshirt';
import { Link, Outlet,useNavigate,useLocation } from 'react-router-dom';
import '../style/SelectAvatar.css' 


const Header2 =()=>
{
  const text="Select Your Avatar";
  const text2="Back to Model Preview";
  return(
   <div className='Avatarhead'>
    <p className='Avatarhead_left'>{text}</p>
    <p className='Avatarhead_right'>{text2}</p>

   </div>
  )
}

const Model = ()=>
{
    const url='./tatoohuman.glb';
    const model = useGLTF(url);
    return(<primitive object={model.scene} scale={[0.5,0.5,0.5]} position={[0,-2,0]}/>)
}


var bingo=5;











const SelectAvatar = () => {

  const [cliked,setCliked]=useState(0);
  const [idVal,setID]=useState(-1);





  const ModelPreviews = () =>
{
  const imgUrl=["./ModelPreview/Girl3.png","./ModelPreview/Girl.png","./ModelPreview/RedTshirt.png","./ModelPreview/Mafia.png"];

  return(
  <div className='container2'>
    <div className='imageHolder'>
      <img src={imgUrl[1]} alt="image" className='images' onClick={()=>{
        setCliked(1);
      }}/>
    </div>
    <div className='imageHolder'>
      <img src={imgUrl[0]} alt="image" className='images' onClick={()=>{
        setCliked(0);
      }}/>
    </div>
    <div className='imageHolder'>
      <img src={imgUrl[2]} alt="image" className='images' onClick={()=>{
        setCliked(2);
      }}/>
    </div>
    <br></br>    
    <div className='imageHolder'>
      <img src={imgUrl[3]} alt="image" className='images' onClick={()=>{
        setCliked(3);
      }}/>
    </div>

  </div>)

}

const Details=()=>
{
  const names=["Kitchen Kit","Purplefire","Xolby","Creative Doc"];
  const Characters=["Fun","Crazy","Heroic Performer","MasterMind"];
  var Selection="";
  const navigate=useNavigate();
  const toMyAvatar=()=>{
    navigate('/CustomizeAvatar',{state:{id:{idVal}.idVal,name:Selection}});
      }
  var name="";
  var charac="";
  if(cliked==1)
  {
    name=names[0];
    charac=Characters[0];
    Selection="Girl1";
    setID(1);
  }
  else if(cliked==2)
  {
    name=names[2];
    charac=Characters[2];
    Selection="Redtshirt";
    setID(3);
  }
  else if(cliked==0)
  {
    name=names[1];
    charac=Characters[1];
    Selection="Redtshirt";
    setID(2);
  }
  else if(cliked==3)
  {
    name=names[3];
    charac=Characters[3];
    Selection="Mafia";
    setID(4);
  }
  else
  {
    name="not Selected";
    charac="not selected";
  }

  
  return(
    <div className='detailer'>
      <div className='nameHolder'>
        <p className='nameaHolder_left'>Name : {name}</p>
        <p className='nameaHolder_Right'>Character: {charac}</p>
      </div>
      <div onClick={()=>{
        toMyAvatar()
      }}>
      <p className='SelectBtn'>Select the Avatar</p>
      </div>
    
    </div>
  )
}

const Mod =()=>
{
  if(cliked==1)
  {
    return(
      <Girl/>
    )
  }
  else if(cliked==2)
  {
    return(
      <RedShirt/>
    )
  
  }
  else if(cliked==0)
  {
    return(
      <Girl2/>
    )
  }
  else if(cliked==3)
  {
    return(
      <Mafia/>
    )
  }
}




  return (
    <>
    <Header2/>
    
    <ModelPreviews/>
    <div className='avatarPreview'>
        <Canvas >
       
        <spotLight position={[5, 40, 30]} angle={0.15} penumbra={1} intensity={1}/>
        <pointLight position={[-10, -10, -10]} />
        <PresentationControls snap global zoom={0.8} rotation={[0, -Math.PI / 4, 0]}   config={{ mass: 1, tension: 170, friction: 26 }}>   
        <Mod/>
        </PresentationControls>
        <OrbitControls/>
        </Canvas>      
    </div>
    <Details/>
    </>
  )
}

export default SelectAvatar


