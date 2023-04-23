import NavBar from "../NavBar";
import MenuHamburguer from "../MenuHamburguer";
import { useState } from "react";


interface Props{
    role:string
}
export default function Header(props:Props){
    const[isActived, setIsActived]=useState(false)
    return (
        <>
          <MenuHamburguer 
            role={props.role}
            isActived={isActived} 
            setIsActived={setIsActived}/>


            <NavBar setIsActived={setIsActived}/>
        </>
    )
}

