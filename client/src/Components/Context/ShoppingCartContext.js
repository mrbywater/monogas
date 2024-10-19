import {useState, createContext, useEffect} from "react";

export const ShoppingCartContext = createContext();
export const ShoppingCartProvider = ({ children }) => {

    const [shopCart, setShopCart] = useState((localStorage.getItem('shoppingCart').length !== 0 || !localStorage.getItem('shoppingCart') === null) ? JSON.parse(localStorage.getItem('shoppingCart')) : []);
    const [priceArray, setPriceArray] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [dataBase, setDataBase] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true)
        try{
            setDataBase (await fetch("http://localhost:5050/record")
                .then(response => {
                    setIsLoading(false)
                    return response.json()
                }));
        } catch (err){
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    } ,[])

    useEffect(() => {
        setTotalPrice(priceArray.reduce((elem, acc) => elem + acc, 0))
    })

    useEffect(()=>{

        setPriceArray(shopCart.map(elm => elm.price * elm.quantity))

        localStorage.setItem('shoppingCart', JSON.stringify(shopCart))

    }, [shopCart])

    const addItemToCart = (item) => (e) => {

        setShopCart(prevCartItems => {
            const existingCartItem = prevCartItems.find(elm => elm.headline === item.headline);
            if (existingCartItem) {
                return prevCartItems;
            } else {
                const newCartItem = { ...item, quantity: 1 };
                const updatedCartItems = [...prevCartItems, newCartItem];
                return updatedCartItems;
            }
        });

    }

    const removeItemFromCart = (item) => (e) => {
        const newShopItems = shopCart.filter(elem => item.headline !== elem.headline);
        setShopCart(newShopItems);
    };

    const increaseItemQuantity = (item) => (e) =>  {

        const newShopItems = shopCart.map(cartItem => {

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

        setShopCart(newShopItems);
    };

    const decreaseItemQuantity = (item) => (e) => {

        const newShopItems = shopCart.map(cartItem => {

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

        setShopCart(newShopItems);
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                fetchData,
                dataBase,
                isLoading,
                shopCart,
                totalPrice,
                isOpen,
                setIsOpen,
                setShopCart,
                addItemToCart,
                removeItemFromCart,
                increaseItemQuantity,
                decreaseItemQuantity
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};

