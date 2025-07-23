import { useEffect, useState, createContext, useContext } from "react";
import Shimmer from "./Shimmer";
import { RESTAURANT_MENU_IMG } from "../utils/constants";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";

// Cart Context for global state management
const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            getTotalItems,
            getTotalPrice,
            clearCart,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Cart Component
const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, isCartOpen, setIsCartOpen } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsCartOpen(false)}
            />
            
            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300">
                <div className="flex flex-col h-full">
                    {/* Cart Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-orange-50">
                        <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-8">
                                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5M17 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <p className="text-gray-500">Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        {item.imageId && (
                                            <img
                                                src={RESTAURANT_MENU_IMG + item.imageId}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
                                            <p className="text-green-600 font-semibold">₹{item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-200 p-4 space-y-3">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total: ₹{getTotalPrice().toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// Cart Button for Header
export const CartButton = () => {
    const { getTotalItems, setIsCartOpen } = useCart();
    const totalItems = getTotalItems();

    return (
        <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5M17 18a2 2 0 11-4 0 2 2 0 014 0zM9 18a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </button>
    );
};

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resData = useRestaurantMenu(resId);
    const [resInfo, setResInfo] = useState(null);
    const [resMenu, setResMenu] = useState([]);
    const [expandedAccordion, setExpandedAccordion] = useState(null);

    useEffect(() => {
        if (resData) {
            // Extract restaurant info
            const restaurantInfo = resData?.cards?.find((obj) =>
                obj?.card?.card["@type"]?.includes("food.v2.Restaurant")
            )?.card?.card?.info;

            // Extract menu data
            const menuData = resData?.cards
                ?.find((obj) => obj?.groupedCard)
                ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
                    (obj) =>
                        obj?.card?.card["@type"]?.includes("ItemCategory") ||
                        obj?.card?.card["@type"]?.includes("NestedItemCategory")
                );

            const organisedMenuData = menuData?.map((obj) => {
                const type = obj?.card?.card["@type"];
                const title = obj?.card?.card?.title;
                const itemCards = obj?.card?.card?.itemCards;
                const categories = obj?.card?.card?.categories;

                if (type?.includes("Nested")) {
                    return {
                        title,
                        type: "nested",
                        categories: categories?.map((subcategory) => ({
                            title: subcategory?.title,
                            itemCards: subcategory?.itemCards
                        }))
                    };
                } else {
                    return {
                        title,
                        type: "item",
                        itemCards
                    };
                }
            });

            setResInfo(restaurantInfo);
            setResMenu(organisedMenuData);
            // Set the first accordion as expanded by default
            if (organisedMenuData && organisedMenuData.length > 0) {
                setExpandedAccordion(organisedMenuData[0].title);
            }
        }
    }, [resData]);

    const handleAccordionToggle = (categoryTitle) => {
        setExpandedAccordion(expandedAccordion === categoryTitle ? null : categoryTitle);
    };

    if (resInfo === null) return <Shimmer />;

    const { name, areaName, cuisines, costForTwoMessage } = resInfo;

    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    {/* Go Back Button */}
                    <button 
                        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                        onClick={() => history.back()}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back
                    </button>

                    {/* Restaurant Details */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-3">{name}</h1>
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Outlet:</span> 
                                        <span className="ml-2 text-gray-800">{areaName}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        {cuisines?.join(", ")} - <span className="font-semibold text-green-600">{costForTwoMessage}</span>
                                    </p>
                                </div>
                            </div>
                            <CartButton />
                        </div>
                    </div>

                    {/* Menu Categories */}
                    <div className="space-y-6">
                        {resMenu?.map((category) =>
                            category?.type === "nested" ? (
                                <NestedMenuCategory
                                    key={category?.title}
                                    category={category}
                                    isExpanded={expandedAccordion === category?.title}
                                    onToggle={() => handleAccordionToggle(category?.title)}
                                />
                            ) : (
                                <MenuCategory
                                    key={category?.title}
                                    category={category}
                                    isExpanded={expandedAccordion === category?.title}
                                    onToggle={() => handleAccordionToggle(category?.title)}
                                />
                            )
                        )}
                    </div>
                </div>
                <Cart />
            </div>
        </CartProvider>
    );
};

const truncateString = (str, maxLength) => {
    if (!str) return "";
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

const MenuCategory = ({ category, isExpanded, onToggle }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200"
                onClick={onToggle}
            >
                <h3 className="text-lg font-semibold text-gray-800">
                    {category?.title} ({category?.itemCards?.length})
                </h3>
                <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            
            {isExpanded && (
                <div className="divide-y divide-gray-100">
                    {category?.itemCards?.map((item) => (
                        <MenuItem key={item?.card?.info?.id} item={item?.card?.info} />
                    ))}
                </div>
            )}
        </div>
    );
};

const NestedMenuCategory = ({ category, isExpanded, onToggle }) => {
    const [expandedSubcategory, setExpandedSubcategory] = useState(null);

    // Reset subcategory expansion when main category is collapsed
    useEffect(() => {
        if (!isExpanded) {
            setExpandedSubcategory(null);
        } else if (category?.categories && category.categories.length > 0) {
            // Set the first subcategory as expanded when main category opens
            setExpandedSubcategory(category.categories[0].title);
        }
    }, [isExpanded, category?.categories]);

    const handleSubcategoryToggle = (subcategoryTitle) => {
        setExpandedSubcategory(expandedSubcategory === subcategoryTitle ? null : subcategoryTitle);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
                className="w-full px-6 py-4 flex items-center justify-between bg-orange-50 hover:bg-orange-100 transition-colors duration-200 border-b border-orange-200"
                onClick={onToggle}
            >
                <h3 className="text-xl font-bold text-gray-800">{category?.title}</h3>
                <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            
            {isExpanded && (
                <div className="space-y-4 p-4">
                    {category?.categories?.map((subcategory) => (
                        <div key={subcategory?.title} className="border border-gray-200 rounded-lg overflow-hidden">
                            <SubMenuCategory 
                                subcategory={subcategory}
                                isExpanded={expandedSubcategory === subcategory?.title}
                                onToggle={() => handleSubcategoryToggle(subcategory?.title)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const SubMenuCategory = ({ subcategory, isExpanded, onToggle }) => {
    return (
        <>
            <button
                className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={onToggle}
            >
                <h4 className="text-md font-semibold text-gray-800">
                    {subcategory?.title} ({subcategory?.itemCards?.length})
                </h4>
                <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            
            {isExpanded && (
                <div className="divide-y divide-gray-100">
                    {subcategory?.itemCards?.map((item) => (
                        <MenuItem key={item?.card?.info?.id} item={item?.card?.info} />
                    ))}
                </div>
            )}
        </>
    );
};

const MenuItem = ({ item }) => {
    const { name, description, price, defaultPrice, imageId, id } = item;
    const { addToCart } = useCart();
    
    const itemPrice = ((price || defaultPrice) / 100);
    
    const handleAddToCart = () => {
        const cartItem = {
            id: id,
            name: name,
            price: itemPrice,
            imageId: imageId,
            description: description
        };
        addToCart(cartItem);
    };

    return (
        <div className="p-4 flex gap-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex-1">
                {name && <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>}
                {description && (
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {truncateString(description, 120)}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    {(price || defaultPrice) && (
                        <p className="text-lg font-bold text-green-600">
                            ₹{itemPrice.toFixed(2)}
                        </p>
                    )}
                    <button
                        onClick={handleAddToCart}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add
                    </button>
                </div>
            </div>

            {imageId && (
                <div className="flex-shrink-0">
                    <img
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                        src={RESTAURANT_MENU_IMG + imageId}
                        alt={name}
                    />
                </div>
            )}
        </div>
    );
};

export default RestaurantMenu;