import { Children, createContext, useState } from "react";
import uploadProfileImage from "../utils/uploadProfileImage";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const clearUser = () => {
        setUser(null)
    }

    const contextValue = {
        user,
        setUser,
        clearUser
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}