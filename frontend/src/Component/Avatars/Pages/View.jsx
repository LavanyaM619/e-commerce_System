import {Canvas,useFrame} from '@react-three/fiber'
import React, { useRef, useState ,Suspense} from "react";
import { OrbitControls ,Gl, Gltf,Environment, Center} from '@react-three/drei'   
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { MeshWobbleMaterial, useGLTF,PresentationControls } from '@react-three/drei'
import Header from './Header';
import "../style/Environment.css";
import { Link, Outlet,useNavigate} from 'react-router-dom';

function Buttons()
{
    const [show,notShow]=useState("Show Buttons");
    const [click,not]=useState(false);
    const [visiclass,setVisi]=useState('btnVisiblenot')
    const navigate=useNavigate();
    const toSelectAvatar=()=>
    {
      navigate('./SelectAvatar',{});
    }

    return(
        <>
        <div className='btnHolder' onClick={()=>
            {
                not(!click);
                if(click)
                {
                    notShow("hide Button");
                    setVisi("btnVisible")
                    
                }
                else
                {
                    notShow("Show Buttons")
                    setVisi("btnVisiblenot")
                   
                }

            }}>
            <p >{show}</p>


        </div>
        <div className={visiclass}>
            <p className='neet'>Back to Home</p>
            <p className='neet' onClick={()=>
            {
              toSelectAvatar()
            }}>Try Fiton</p>
        </div>
        <Outlet/>
        </>
    
    )
}



const Shirt = ()=>
{
  const url='./Colorshirt.glb'
  const gltf = useGLTF(url)
  return (<primitive object={gltf.scene} position={[0,-4,0]} rotation={[0,0,0]} scale={[20,20,20]} onClick={()=>
{
    console.log("im shirt")
}}/>)
  
}

const Modeltwo = ()=>
{
  const url='./Room2.glb'
  const gltf = useGLTF(url)
  return (<primitive object={gltf.scene} position={[-1,-3,-4]} rotation={[0,0,0]}   />)
  
}


const Model = ()=>
{
  const url='https://thinkuldeep.com/modelviewer/Astronaut.glb'
  const gltf = useGLTF(url)
  return (<primitive object={gltf.scene}  onClick={
    (e)=>
    {}
  }/>)
  
}


/*const Model = () => {
    const gltf = useLoader(OBJLoader, './Shirt.obj');
    const colorMap = useLoader(TextureLoader, "./flor.jpg")
    return (
      <>
        <primitive object={gltf} scale={0.1} position={[0,-12,0]} receiveShadow
        castShadow>
            <meshStandardMaterial color={"#00FF00"} />
            </primitive>
      </>
    );
  };
*/


  
  
function Box(props)
{

    //referencing the object
    const ref=useRef();

    //useState- custom data
    const [hover,setHover]=useState(false);
    const [click,setClick]=useState(false);
    const [light,dark]=useState(true);
    


    useFrame((state,delta)=>{
      
        ref.current.rotation.x +=delta;
        //state.camera.position.lerp(vec, step);
        state.camera.lookAt(0, 0, 0);
        // Update to new position/lookAt
        state.camera.updateProjectionMatrix();
    });


    return (
        <mesh
        {...props}
        ref={ref}
        scale={click ? 1.5 : 1}
        onClick={(event) => setClick(!click)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hover? 'hotpink' : 'orange'} />
      </mesh>
    )

   



}


const View = () => {
    return (
        <>
        <Header/>
        <div className="container">
    <Canvas className='canV' camera={{ fov: 50, position: [0.009431248528380747,1.3997951872973402,10.130415714138898]}} >
        <ambientLight intensity={1} color={'#ffffff'} />
        <spotLight position={[5, 40, 30]} angle={0.15} penumbra={1} intensity={3}/>
        <pointLight position={[-10, -10, -10]} />
        
        <PresentationControls snap global zoom={0.8} rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]} config={{ mass: 1, tension: 170, friction: 26 }}>
        <Suspense fallback={null}>
      
        <Shirt/>
        </Suspense>
        </PresentationControls>
        <Modeltwo />
        
        <OrbitControls  />
      </Canvas>
      </div>
        <Buttons/>
      </>
      )
    }

export default View
