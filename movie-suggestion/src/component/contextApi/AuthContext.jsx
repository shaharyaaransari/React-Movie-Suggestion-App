import { createContext, useState } from "react";

export const  AuthContext = createContext()

 const ContextProvider = ({children})=>{
   const [fav,setFav] = useState([])
    const [isAuth,setAuth]=useState(false)
         return(
   
     <AuthContext.Provider value={{isAuth,setAuth,fav,setFav}}> 
         {children}
        </AuthContext.Provider>
         )
}
 export default ContextProvider