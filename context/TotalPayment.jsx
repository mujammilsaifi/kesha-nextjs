import {useContext,useState,createContext,useEffect} from 'react';

const TotalPaymentContext=createContext();

const TotalPaymentProvider=({children})=>{
    const [totalPayment, setTotalPayment] = useState([])
    useEffect(() => {
        let exisitingTotalPayment=localStorage.getItem("totalPayment");
        if(exisitingTotalPayment){
            setTotalPayment(JSON.parse(exisitingTotalPayment));
        }
    }, [])
    return (
        <TotalPaymentContext.Provider value={[totalPayment, setTotalPayment]}>
            {children}
        </TotalPaymentContext.Provider>
    )
}

//custom hooks
const useTotalPayment=()=>useContext(TotalPaymentContext);
export {useTotalPayment,TotalPaymentProvider};