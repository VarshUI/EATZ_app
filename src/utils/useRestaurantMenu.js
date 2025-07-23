import { useEffect, useState } from "react";
import { RESTAURANT_MENU_API } from "./constants.jsx";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        const data = async () => {
            const response = await fetch(RESTAURANT_MENU_API + resId);
            const json = await response.json();
            setResInfo(json.data);
        };
        data(); // Actually call the function
    }, [resId]); // Add resId to dependency array
    
    return resInfo;
};

export default useRestaurantMenu;