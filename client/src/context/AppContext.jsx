import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

  // Fetch Seller Status
  const fetchSeller = async ()=>{
    try {
        const {data} = await axios.get('/api/seller/is-auth');
        if(data.success){
            setIsSeller(true)
        }else{
            setIsSeller(false)
        }
    } catch (error) {
        setIsSeller(false)
    }
  }

// Fetch User Auth Status , User Data and Cart Items
const fetchUser = async ()=>{
    try {
        const {data} = await axios.get('/api/user/is-auth');
        
        if (data.success){
            
            setUser(data.user)
            const localCart = localStorage.getItem('cartItems');
            if (!localCart || localCart === "{}") {
                setCartItems(data.user.cartItems || {});
            }

            // setCartItems(data.user.cartItems)
            // console.log(data);
            console.log("Fetched user:", data);
        }
    } catch (error) {
        setUser(null)
    }
}



    // Fetch All Products
    const fetchProducts = async ()=>{
        try {
            const { data } = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

// Add Product to Cart
const addToCart = (itemId)=>{
    let cartData = structuredClone(cartItems);

    if(cartData[itemId]){
        cartData[itemId] += 1;
    }else{
        cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart")
}

  // Update Cart Item Quantity
  const updateCartItem = (itemId, quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData)
    toast.success("Cart Updated")
  }

// Remove Product from Cart
const removeFromCart = (itemId)=>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId] -= 1;
        if(cartData[itemId] === 0){
            delete cartData[itemId];
        }
    }
    toast.success("Removed from Cart")
    setCartItems(cartData)
}

  // Get Cart Item Count
  const getCartCount = ()=>{
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item];
    }
    return totalCount;
  }

// Get Cart Total Amount
// const getCartAmount = () =>{
//     let totalAmount = 0;
//     for (const items in cartItems){
//         let itemInfo = products.find((product)=> product._id === items);
//         if(cartItems[items] > 0){
//             totalAmount += itemInfo.offerPrice * cartItems[items]
//         }
//     }
//     return Math.floor(totalAmount * 100) / 100;
// }

const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
        const itemInfo = products.find((product) => product._id === itemId);

        if (!itemInfo) {
            console.warn(`Product with ID ${itemId} not found.`);
            continue;
        }

        if (cartItems[itemId] > 0 && itemInfo.offerPrice) {
            totalAmount += itemInfo.offerPrice * cartItems[itemId];
        }
    }
    return Math.floor(totalAmount * 100) / 100;
};






    // useEffect(()=>{
    //     fetchUser()
    //     fetchSeller()
    //     fetchProducts()
    // },[])

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedCart = localStorage.getItem('cartItems');
    
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []);
    

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);
    
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    



    // Update Database Cart Items
    // const updateCart = async ()=>{
    //     try {
            
    //         const { data } = await axios.post('/api/cart/update', {cartItems})
    //         if (!data.success){
    //             toast.error(data.message)
    //         }
            
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }
    // useEffect(()=>{
        
    //     const fetchCart = async () => {
    //         try {
    //             const { data } = await axios.get('/api/cart/fetch')
    //             if (data.success){
    //                 // let cI = data.cartItems
    //                 // setCartItems(cI)
    //                 // toast.error(data.message)
    //             }
    //         } catch (error) {
    //             toast.error(error.message)
    //         }
    //     } 
        
    //     if(user){
    //         // console.log(user);

    //         if(!user.cartItems) {
    //             console.log('1');
    //             updateCart()
    //         } else {
    //             // console.log('2');
    //             // fetchCart()
    //             // return
    //         }
    //     }
    // },[cartItems])

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await axios.get('/api/cart/fetch')
                if (data.success) {
                    const localCart = localStorage.getItem('cartItems');
                    // setCartItems(data.cartItems)
                    if (!localCart || localCart === "{}") {
                        setCartItems(data.cartItems || {});
                    }
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    
        // if (user && user.cartItems) {
        if (user) {
            fetchCart()
        }
    }, [user])
    
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    
        // if (user && !user.cartItems) {
        if (user) {
            updateCart()
        }
    }, [cartItems, user])
    

    const value = {navigate, user, setUser, setIsSeller, isSeller,
        showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}  