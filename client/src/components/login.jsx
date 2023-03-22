
import { useState } from "react";
import { loginField } from "../constant"

let fields= {};


loginField.forEach(filed=>()=>{

fields[filed.id]="";

});
const Login=()=>{
        const [inputdata,setInputData]= useState(fields)

        return (
            <div>
           
                {
                     loginField.map(  field=>
               
                        <input 
                            type={field.type}
                            label={field.label}
                            name={field.name}
                            placeholder={field.placeholder}
                            id={field.id}
                            className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mb-5"



                        />
               
                        )
                }
              
            
           </div>
        )

}


export default Login