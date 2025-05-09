import { useState } from "react";
import { Shimmer } from "./Shimmer";
import {  useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu=()=>{

   
    const [isVeg, setIsVeg] = useState(false);
    const [showIndex, setShowIndex]=useState(0);
    const {resid}=useParams();
    const resInfo=useRestaurantMenu(resid);//CUSTOM HOOK
   
  
    if(resInfo===null) return <Shimmer/>;  
    const{name,cuisines,costForTwoMessage}=resInfo?.cards[2]?.card?.card?.info;
    const itemCards =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards ||
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards ;
  // console.log(resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  const categories=resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
                  .filter( c=>
                    c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                     {/*||c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"*/} );

    const filteredItems = isVeg ? itemCards.filter( (item) => item?.card?.info?.itemAttribute?.vegClassifier ==="VEG" ) : itemCards;
    // console.log(filteredItems)
    
    
    

  
    return(
       <div className="text-center">
        <h1 className="font-bold my-6 text-2xl">{name}</h1>
        <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>
        <h2>MENU</h2>

        <button
        className="vegfilter"
        onClick={() => setIsVeg(!isVeg)} // Toggle veg filter state
      >
        {/* {console.log(isVeg)} */}
        {isVeg ? "Show All" : "Veg Only"}
      </button>
      {/*categories accordions*/}
      {categories.map((category,index)=>(
        <RestaurantCategory key={category?.card?.card?.title} info={category?.card?.card } showItems={index===showIndex ? true : false} 
          setShowIndex={() => setShowIndex(index)}/>
      ))}

       </div>

    );      

};
export default RestaurantMenu;

