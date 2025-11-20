import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Inputs from "../components/Inputs";
import { vallidateEmail } from "../utils/validation";
import axiosConfig from "../utils/axioConfig";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Login = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {user, setUser} = useContext(AppContext);

    const navigate = useNavigate();

     const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);
            // Handle form submission logic here
            // Basic validation
    
            if(!vallidateEmail(email)) {
                setError("please enter valid email address");
                setIsLoading(false);
                return;
            }
    
            if(!password.trim()) {
                setError("please enter your password");
                setIsLoading(false);
                return;
            }

            setError("");

            // login api call
            try {
                const response = await axiosConfig.post("/login", {
                    email : email.toLowerCase(),
                    password 
                });

                const {token, user} = response.data;
                
                if (token) {
                    localStorage.setItem("token", token);
                    setUser(user);
                    navigate("/dashboard");
                }
                
            }   
            catch(err) {
                if(err.response && err.response.data.message) {
                    setError(err.response.data.message);
                }else {
                    console.error("something went wrong", err);
                    setError(err.message);
                }
                
            }finally {
                setIsLoading(false);
            }
        }

    return (
         <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background image with blur effect */}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
        
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 background-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to access your account.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <Inputs 
                            label="Email Address" 
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="full@example.com"
                            value={email}
                        />

                        <div className="col-span-2">
                            <Inputs 
                                label="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="*******"
                                value={password}
                            />
                        </div>
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button
                            disabled={isLoading}
                            type="submit"
                            className={`w-full bg-purple-600 cursor-pointer text-white py-3 px-4 text-lg font-medium rounded hover:bg-purple-700 transition duration-200 flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}>
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Logging In...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </button>

                        <p className="text-sm text-center text-slate-800 mt-4">
                            Don't have an account?
                            <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors ml-1">
                                Sign Up
                            </Link>    
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;