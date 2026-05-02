import { Link } from "react-router";

const navcontents =[
   { label:"home",
    link:"/"},
    { label:"products",
    link:"/products"},
    { label:"About us",
    link:"/aboutus"},
    { label:"Contact us",
    link:"/contact us"},
    
]

const Navcontents=()=>{
    return(
        <div className="flex justify-center gap-2 ">{
    navcontents.map((item)=><Item link={item.link} label={item.label}/>)}
    </div>
    )   

}

const Item =({label,link}:{label:string,link:string})=>{

    return(
        <div>
           
        < Link to={link} className="hover:text-amber-400">{label} </Link>
        </div>
    )
}

export default Navcontents 