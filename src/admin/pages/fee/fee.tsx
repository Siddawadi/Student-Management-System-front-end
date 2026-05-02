import { Fee } from "."
import { Link } from "react-router"
export const Fees = ()=>{
return(    
<main className="min-h-screen min-w-screen flex-col flex gap-3 ">
    
     <Link to="/admin/addfees"
      className='border w-fit px-4 py-2 text-white bg-green-700 rounded-lg'> Add fees+</Link>
   <Fee/>

    <div>
 
    </div>
</main>

)
        
   


}