import { useState } from "react";
const UserFunctional=({name,location})=>{
    const [count,setcount]=useState(0);
    const [count2]=useState(2);

    return(
        <div>
        <h1>name:{name}</h1>
       <h2>location:{location}
        <br/>
        count:{count},
        <button onClick={()=>{
            setcount(count+1);


        }}>
         increaseCount
        </button>
        count2:{count2}
       </h2>
       
       </div>
        
    );


};
export default UserFunctional;