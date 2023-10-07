import Girl from '../Avatars/Girl';
import Girl2 from '../Avatars/Girl2';
import RedShirt from '../Avatars/Redtshirt';
import Mafia from '../Avatars/Mafia'
import {Canvas,useFrame} from '@react-three/fiber'
import React, { useRef, useState ,Suspense} from "react";
import { OrbitControls ,Gl, Gltf,Environment, Center, useGLTF,PresentationControls } from '@react-three/drei' 
import { useLocation } from 'react-router-dom';
import '../style/CustomizeAvatar.css'



//Modelid
// 1 - Girl 1
// 2- Girl 2
// 3- RedTshirt
// 4- Master


const CustomizeAvatar = () => {

  const {state} = useLocation();
  const [click,setClick]=useState(false);
  const [Customize,ok]=useState("Customize Avatar");
  const { id, color } = state;
  console.log(id+"id valued i");
 
    const [valueShirt,SetValueShirt]=useState(null);
    const [valueSkin,setvalueSkin]=useState(null);
    const [valueShoe,SetvalueShoe]=useState(null);
    const [ValuePant,setValuePant]=useState(null);
    const [Accessories,setValueAccessories] =useState(null);
    const [ValueHair,setValueHair]=useState(null);
    const ModelId=id;

    const ModelExporter=(props)=>
    {
      if(props.id==1)
      {
        return(
          <Girl shirt={valueShirt} skin={valueSkin} shoe={valueShoe} pant={ValuePant} Accesories={Accessories} hair={ValueHair}/>
        )
      }
      else if(props.id==2)
      {
        return(
          <Girl2 shirt={valueShirt} skin={valueSkin} shoe={valueShoe} pant={ValuePant} Accesories={Accessories} hair={ValueHair}/>
        )
        }
      else if(props.id==3)
      {
        return(
          <RedShirt shirt={valueShirt} skin={valueSkin} shoe={valueShoe} pant={ValuePant} Accesories={Accessories} hair={ValueHair}/>
        )
         
      }
      else if(props.id==4)
      {
        return(
          <Mafia shirt={valueShirt} skin={valueSkin} shoe={valueShoe} pant={ValuePant} Accesories={Accessories} hair={ValueHair}/>
        )
         
      }
    }

    



    


  return (
    <>
    <div className="inputField">
      <div className="field">
      <label className="singleFields">Avatar Name</label><br/>
      <input type="text" name="AvatarName"  placeholder="Avatar Name.."className="singleFieldsinputs"/><br/><br/><br/>
      <label className="singleFields">Tshirt Size</label><br/>
      <input type="text" name="AvatarName"  placeholder="Tshirt Size.."className="singleFieldsinputs"/><br/><br/><br/>
      <label className="singleFields">Waist Size</label><br/>
      <input type="number" max={15} min={5} name="AvatarName"  placeholder="waist Size in Number..(Scroll to set the measurement)"className="singleFieldsinputs"/><br/><br/><br/>
      <label className="singleFields">Shirt Collor Size</label><br/>
      <input type="number" max={15} min={5} name="AvatarName"  placeholder="Collor Size in Number..(Scroll to set the measurement)"className="singleFieldsinputs"/><br/><br/><br/>
      <div className="Activator">
      <label >Customize Selected Avatar</label>
      <p className="Activator_L" onClick={()=>{
        console.log(click)
        setClick(!click)
        if(click)
        {
          ok("Confirm");
          const target=document.getElementById("CustomTab");
          target.className="tabCustomView";
          
        }
        else
        {
          ok("Customize Avatar");
          const target=document.getElementById("CustomTab");
        target.className="tabCustom";
        }
        
      }}>{Customize}</p>
      <p className="Activator_R" onClick={()=>
      {
        const target=document.getElementById("CustomTab");
        target.className="tabCustom";
        setValueAccessories(null);
        setValueHair(null);
        setValuePant(null);
        setvalueSkin(null);
        SetValueShirt(null);
        SetvalueShoe(null);
      }}>Don't Customize</p>
      </div>
      <br/><br/><br/><br/>
      <div className="tabCustom" id="CustomTab">
        <div className="CustomizerHolders">
          <p>Skin Tone</p>
          <input type='color' name='skincolor' id="SkinCode" value="#45609A" style={{width:100,height:40}} onChange={
            ()=>
            {
              const ValueGiven=document.getElementById("SkinCode").value;
              const ValueExtract=ValueGiven.slice(1);
              const FinalValue="0x"+ValueExtract;
              console.log(FinalValue);
              setvalueSkin(FinalValue);
            }}/>
        </div>
        <div className="CustomizerHolders">
          <p>Pant Color</p>
          <input type='color' name='pantcolor' id="PantCode" value="#E395BF"  style={{width:100,height:40}} onChange={
            ()=>
            {
              const ValueGiven=document.getElementById("PantCode").value;
              const ValueExtract=ValueGiven.slice(1);
              const FinalValue="0x"+ValueExtract;
              console.log(FinalValue);
              setValuePant(FinalValue);
            }}/>
        </div>
        <div className="CustomizerHolders">
          <p>Shirt Color</p>
          <input type='color' name='shirtcolor' value="#BE3455" id="ShirtCode" style={{width:100,height:40}} onChange={
            ()=>
            {
              const ValueGiven=document.getElementById("ShirtCode").value;
              const ValueExtract=ValueGiven.slice(1);
              const FinalValue="0x"+ValueExtract;
              console.log(FinalValue);
              SetValueShirt(FinalValue);
            }}/>
        </div>
        <div className="CustomizerHolders">
          <p>Hair Color</p>
          <input type='color' name='Haircolor' value="#B0BF1A" id="HairCode" style={{width:100,height:40,}} onChange={
            ()=>
            {
              const ValueGiven=document.getElementById("HairCode").value;
              const ValueExtract=ValueGiven.slice(1);
              const FinalValue="0x"+ValueExtract;
              console.log(FinalValue);
              setValueHair(FinalValue);
            }}/>
        </div>
        <div className="CustomizerHolders">
          <p>Shoe Color</p>
          <input type='color' name='shoecolor'  value="#43AA8B" id="ShoeCode" style={{width:100,height:40}} onChange={
            ()=>
            {
              const ValueGiven=document.getElementById("ShoeCode").value;
              const ValueExtract=ValueGiven.slice(1);
              const FinalValue="0x"+ValueExtract;
              console.log(FinalValue);
              SetvalueShoe(FinalValue);
            }}/>
        </div>
        <div className="CustomizerHolders">
          <p>Accessories Color</p>
          <input type='color' name='accessoriescolor' value="#56beba" id="AccsCode" style={{width:100,height:40}} onChange={
            ()=>
            {
              const ValueGiven=document.getElementById("AccsCode").value;
              const ValueExtract=ValueGiven.slice(1);
              const FinalValue="0x"+ValueExtract;
              console.log(FinalValue);
              setValueAccessories(FinalValue);
            }}/>
        </div>
      
      
        
  
      </div>
      <div>
        <p>Submit</p>
      </div>
      </div>

    </div>
    <div className="CustomContainer">
    <Canvas >
       <spotLight position={[5, 40, 30]} angle={0.15} penumbra={1} intensity={1}/>
       <pointLight position={[-10, -10, -10]} />
       <PresentationControls snap global zoom={0.8} rotation={[0, -Math.PI / 4, 0]}   config={{ mass: 1, tension: 170, friction: 26 }}>   
       
        <ModelExporter id={ModelId}/>
       </PresentationControls>
       <OrbitControls/>
       </Canvas>  
    </div>
    </>
  )
}

export default CustomizeAvatar
