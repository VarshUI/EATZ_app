import { RESTAURANT_IMG, STAR_URL } from "../utils/constants";
import { Link } from "react-router";

const RestaurantCard = (props) => {
    const { id, name, avgRating, cuisines, areaName, cloudinaryImageId } =
        props?.item;

    return (
        <Link 
            to={`/restaurant/menu/${id}`} 
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
        >
            <div className="relative">
                <img
                    className="w-full h-48 object-cover"
                    src={`${RESTAURANT_IMG}/${cloudinaryImageId}`}
                    alt={name}
                />
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold">
                    <img className="w-3 h-3" src={STAR_URL} alt="star" />
                    {avgRating?.toFixed(1)}
                </div>
            </div>
            
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-orange-500 transition-colors duration-200">
                    {name}
                </h3>
                
                <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {cuisines?.join(", ")}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {areaName}
                </div>
            </div>
        </Link>
    );
};
export const withPromotedLabel = (RestaurantCard=>{
    return (props)=>{
        return (
            <div>
              <label className="wd-30 ht-30 absolute bg-black text-white z-50 m-2 p-2 rounded-lg">Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
})

export default RestaurantCard;