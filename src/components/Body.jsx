import { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { RESTAURANT_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState(null);
  const [isTopRatedFilterOn, setIsTopRatedFilterOn] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(RESTAURANT_API);
        const json = await response.json();
        let restaurants =
          json?.data?.cards?.find((item) =>
            item?.card?.card?.id?.includes("restaurant_grid")
          )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        // Simulate promoted restaurants (for testing/demo)
        restaurants = restaurants.map((res, index) => ({
          ...res,
          info: {
            ...res.info,
            promoted: index % 3 === 0, // every 3rd restaurant is "promoted"
          },
        }));

        setAllRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchRestaurants();
  }, []);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <div className="flex items-center justify-center h-64">
        <h1 className="text-2xl font-semibold text-red-600 text-center px-4">
          Sorry! looks like you're offline. Please check your internet connection
        </h1>
      </div>
    );
  }

  if (allRestaurants?.length === 0) {
    return <Shimmer />;
  }

  const toggleTopRatedFilter = () => {
    if (!isTopRatedFilterOn) {
      const filtered = allRestaurants.filter(
        (res) => res?.info?.avgRating > 4.3
      );
      setFilteredRestaurants(filtered);
      setIsTopRatedFilterOn(true);
      setSearchError(null);
    } else {
      setFilteredRestaurants(allRestaurants);
      setIsTopRatedFilterOn(false);
      setSearchError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter and Search Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          <div className="filter">
            <button
              onClick={toggleTopRatedFilter}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isTopRatedFilterOn
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500"
              } shadow-md hover:shadow-lg`}
            >
              {isTopRatedFilterOn ? "Show All Restaurants" : "Top Rated Restaurants"}
            </button>
          </div>

          {/* Search restaurants */}
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className="flex-1 sm:w-80 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
            />
            <button
              onClick={() => {
                const filtered = allRestaurants.filter((res) =>
                  res?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
                );
                setFilteredRestaurants(filtered);
                if (filtered.length > 0) {
                  setSearchError(null);
                } else {
                  setSearchError(
                    `Sorry, we couldn't find any results for "${searchText}"`
                  );
                }
                setIsTopRatedFilterOn(false);
              }}
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        </div>

        {/* Error Message */}
        {searchError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium text-center">{searchError}</p>
          </div>
        )}

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRestaurants?.map((restaurant) => {
  const Promoted = withPromotedLabel(RestaurantCard);
  return restaurant.info.promoted ? (
    <Promoted key={restaurant.info.id} item={restaurant.info} />
  ) : (
    <RestaurantCard key={restaurant.info.id} item={restaurant.info} />
  );
})}

        </div>
      </div>
    </div>
  );
};

export default Body;
