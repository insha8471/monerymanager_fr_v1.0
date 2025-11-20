import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";




const Inputs = ({label,value, onChange, type, placeholder, isSelect, options}) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
}

    return(    
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 block mb-1">
                {label}
            </label>
            <div className="relative">
                {isSelect ? (
                    <select 
                        className="w-full bg-white border border-gray-300 text-gray-700 text-sm sm:text-base rounded-lg py-2.5 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-50 focus:border-blue-500 transition-all duration-200 cursor-pointer"
                        value={value}
                        onChange={(e) => onChange(e)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input 
                        className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:border-blue-500" 
                        value={value}
                        onChange={(e) => onChange(e)}
                        type={type === "password" ? (showPassword ? "text" : "password") : type}
                        placeholder={placeholder}   
                    />
                )}

                {type === 'password' && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                        {showPassword ? (
                            <Eye 
                                size={20}
                                className="text-purple-600"
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <EyeOff
                                size={20}
                                className="text-slate-400"
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </span>
                )}
            </div>
        </div>
    )      
}

export default Inputs;