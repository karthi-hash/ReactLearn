
import RestaurantCard ,{withPromotedLabel} from "./RestaurantCard";
import { useState,useEffect, useContext } from "react";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
 





const Body=()=>{
  const [listOfRestaurants,setListOfRestaurant]=useState([]);
  const [filteredRestaurant,setfilteredRestaurant]=useState([]);
  const [ searchText , setSearchText ]=useState("");
  const [backFilter , setbackFilter]=useState("top rated Restaurant");
  //PROMTOED IS NOT AVAILABLE IN NEW VERSION OF SWIGGY SO I'M JUST USING FOR LEARNING PURPOSE
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  console.log("body rendered");

   useEffect(() =>{
    fetchData();
   },[]);

   const fetchData =async ()=>{
    const data = await fetch(
      "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=12.9352403&lng=77.624532&carousel=true&third_party_vendor=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-store" //  This tells browser not to cache it
      }
    );
    // console.log(fetchData)
    const json = await data.json();
    console.log(json);

    setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setfilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    // setListOfRestaurant(json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants  );
    // setfilteredRestaurant(json?.data?.success?.cards[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants);
   };
   const onlineStatus=useOnlineStatus();
   if(onlineStatus===false) return(
     <h1>you're offline!!</h1>);

     const { loggedInUser, setUserName}=useContext(UserContext);

  

    return listOfRestaurants.length === 0 ?<Shimmer/> : (
      <div className="body">
       <div className="filter flex">
        <div className="search m-4 p-4 ">
          <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) =>{
            setSearchText(e.target.value);
          }}  
          />
          <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
          onClick={() =>{
            console.log(searchText);
            const filteredRestaurants = listOfRestaurants.filter(
              (res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
           setfilteredRestaurant(filteredRestaurants);``

          }}
          > 
          search 
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center  ">
        <button 
         className="px-4 py-2 bg-gray-100 rounded-lg"
         onClick={() =>{
          backFilter==="top rated Restaurant"?setbackFilter("back"):setbackFilter("top rated Restaurant");
          if (backFilter==="top rated Restaurant") {
            const  filteredList=listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.4
            );
            setfilteredRestaurant(filteredList)
            
          }else{
            setfilteredRestaurant(listOfRestaurants)
          }
         
        }}
        >
          {/* Top rated restaurant */backFilter}
          </button>
          {/* <div className="search m-4 p-4 flex items-center  ">
          <label>UserName :</label>
          <input className="border border-black p-2"  value = {loggedInUser} onChange={(e)=> setUserName(e.target.value)}/>
        </div> */}

        </div>
        <div className="search m-4 p-4 flex items-center  ">
          <label>Username :</label>
          <input className="border border-black p-2" value={loggedInUser}
           onChange={(e) => setUserName(e.target.value)}></input>
        </div>
    
       </div>
       
        <div className="flex flex-wrap gap-6 justify-start ">
        {filteredRestaurant.map((restaurant)=> (
        <Link key ={restaurant.info.id} to={"/restaurantMenu/"+restaurant.info.id}>
        {/* in api there is no promoted object for learning purpose i used here "isOpen" object which is also boolean type it give true or false */}
        {  restaurant.info.isOpen ? (<RestaurantCardPromoted resData={restaurant}/>):
        ( <RestaurantCard resData={restaurant}/>
        )}
        </Link>
        ))} 

        </div>
         
       
      </div>
    );
    };
    export default Body
