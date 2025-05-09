




// const heading = React.createElement("h1",{id:"heading"},"namaste react.");
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

// home work
// const heading =React.createElement("div",{class:"title"}, React.createElement("h1",{},"this is h1 tag",React.createElement("h2",{},"this is h2 tag",React.createElement("h3",{},"this is h3 tag"))))
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);


// const jsxHeading = (<h1 id="head"> 
//  masala ke pani poori</h1>);

//  const Hello = () =>(
//     <div id = "container">
//         {jsxHeading}
//         {jsxHeading}

//         <h1>ihvdsih</h1>
//     </div>
     
//  );


import React,{lazy,Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import About from "./components/About.js";
import Error from "./components/Error.js";
import Contact from "./components/Contact.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import UserContext from "./utils/UserContext.js";




const Grocery=lazy(()=>import("./components/grocery.js"));
 const Applayout=()=>{
  const[userName,setUserName]=useState();
  useEffect(() => {
    const data ={
      name:"paramesh",

    };
    setUserName(data.name);
  },[]);

    return (
    
      <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
      <div className="app"> 
      <Header />
     <Outlet/>
    </div>
    </UserContext.Provider>
    
    );
 };
 const appRouter =createBrowserRouter([
   {
      path:"/",
      element:<Applayout/>,
      children:[
        {
         path:"/",
        element:<Body/>,
    
        },
       {
      path:"/about",
      element:<About/>,

        },
        {
          path:"/contact",
          element:<Contact/>,
        },
        {
          path:"/grocery",
          element:<Suspense fallback={<h1>loading...</h1>}><Grocery/></Suspense>,
        },
        {
          path:"/restaurantMenu/:resid",
          element:<RestaurantMenu/>,
        },
       ],
       errorElement:<Error/>,
      },
 ])



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);


















// const parent = React.createElement("div",
//     {id:"parent"},
//                           [   React.createElement("div",{id:"child"},
//                          [React.createElement("h1",{},"this is h1 tag"),
//                         React.createElement("h2",{},"this is h2 tag")]),


//                         React.createElement("div",{id:"child2"},
//                             [React.createElement("h1",{},"this is h1 tag"),
//                            React.createElement("h2",{},"this is h2 tag")])]);


// const root =ReactDOM.createRoot(document.getElementById("root"));
// root.render(parent);