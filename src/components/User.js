import React from "react";
class User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            count:0,
            count2:2,
        }
        }
    render(){
       const {count,count2}=this.state;
        const{name,location}=this.props;
        return(
            <div>
             <h1>
            name:{name}
            <br/>
            count:{count}
            <button onClick={()=>{
                this.setState({
                    count:this.state.count+1,
                })
            }}>
                increaseCount

            </button>
            <br/>
            count2:{count2}
            <br/>
            location:{location}
            
             </h1>
             
             
            </div>
        );
    }
}
export default User;