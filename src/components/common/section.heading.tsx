import { Link } from "react-router"

interface Iprops{
title:string,
subtitle:string,
link:string

}

export const SectionHeading = ({title,subtitle,link}:Iprops)=>{
return(
    <div className="text-gray-600 p-3">
        <p className="text-xl">{title}</p>
        <div className="flex justify-between p"> <p>{subtitle}</p>
        <Link to={link}>Explore more</Link></div>
       
    </div>
)
}