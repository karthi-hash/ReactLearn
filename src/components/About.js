import User from "./User";
import UserFunctional from "./UserFuntional";
import UserContext from "../utils/UserContext";
const About=()=>{
    return(
        <div>
    <h1>iam About</h1>
    <div>
        <UserContext.Consumer>
            {({loggedInUser}) => <h1 className="text-xl font-bold">{loggedInUser}</h1>}

        </UserContext.Consumer>
    </div>
    <div className="class">
    <User name={"parameshvaran"}
     location={"chidambaram"}/>
     </div>
     <div className="functional">
        <UserFunctional name={"karthi"}
        location={"chennai"}/>

     </div>

    </div>
    )


}
export default About;