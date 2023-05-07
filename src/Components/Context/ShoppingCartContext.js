import {useState, createContext} from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {

    const [shopItems, setShopItems] = useState([]);
    const addItemToCart = (item) => (e) => {

        setShopItems(prevCartItems => {
            const existingCartItem = prevCartItems.find(elm => elm.headline === item.headline);
            if (existingCartItem) {
                return prevCartItems;
            } else {
                const newCartItem = { ...item, quantity: 1 };
                const updatedCartItems = [...prevCartItems, newCartItem];
                return updatedCartItems;
            }
        });

        // if (!shopItems.includes(item)){
        //     setShopItems([...shopItems, item])
        // }
    }


    const removeItemFromCart = (item) => (e) => {
        const newShopItems = shopItems.filter(elem => item.headline !== elem.headline);
        setShopItems(newShopItems);
    };

    const increaseItemQuantity = (item) => (e) =>  {

        const newShopItems = shopItems.map(cartItem => {

                if (cartItem.headline === item.headline) {
                    if (cartItem.quantity < item.amount) {
                        return {...cartItem, quantity: cartItem.quantity + 1};
                    } else {
                        return {...cartItem, quantity: cartItem.quantity}
                    }
                } else {
                    return {...cartItem, quantity: cartItem.quantity}
                }
        });

        setShopItems(newShopItems);
    };

    const decreaseItemQuantity = (item) => (e) => {

        const newShopItems = shopItems.map(cartItem => {

                if (cartItem.headline === item.headline) {
                    if (cartItem.quantity > 1) {
                        return {...cartItem, quantity: cartItem.quantity - 1}
                    } else {
                        return {...cartItem, quantity: cartItem.quantity}
                    }
                } else {
                    return {...cartItem, quantity: cartItem.quantity}
                }
        });

        setShopItems(newShopItems);
    };

    return (
        <ShoppingCartContext.Provider value={{ shopItems, addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

