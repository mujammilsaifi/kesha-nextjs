import {useContext,useState,createContext} from 'react';

const TopLoadingBar=createContext();

const TopLoadingBarProvider=({children})=>{
    const [loading, setTopLoading] = useState(0)
    return (
        <TopLoadingBar.Provider value={[loading, setTopLoading]}>
            {children}
        </TopLoadingBar.Provider>
    )
}

//custom hooks
const useTopLoadingBar=()=>useContext(TopLoadingBar);
export {useTopLoadingBar,TopLoadingBarProvider};