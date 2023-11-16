import {useContext,useState,createContext,useEffect} from 'react';

const CartContext=createContext();

const CartProvider=({children})=>{
    const [cart, setCart] = useState([])
    useEffect(() => {
        let exisitingCart=localStorage.getItem("cart");
        if(exisitingCart){
            setCart(JSON.parse(exisitingCart));
        }
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//custom hooks
const useCart=()=>useContext(CartContext);
export {useCart,CartProvider};