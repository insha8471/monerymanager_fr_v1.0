import { useState } from "react";
import { assets } from "../assets/assets";
import Inputs from "../components/Inputs";
import { Link, useNavigate } from "react-router-dom";
import { vallidateEmail } from "../utils/validation";
import axios from "axios";
import axiosConfig from "../utils/axioConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../utils/uploadProfileImage";


const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        // Handle form submission logic here
        // Basic validation
        if(!fullName.trim()) {
            setError("please enter your full name");
            setIsLoading(false);
            return;
        }

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


        // signup api call
        try {

            //  upload image if present
            if(profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }

            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl
            })

            if(response.status === 201) {
                toast.success("Profile created successfully");
                setIsLoading(false)
                navigate("/login");
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
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spendings by joining with us.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            {/* Placeholder for profile picture upload */}
                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Inputs 
                                label="Full Name" 
                                onChange={(e) => setFullName(e.target.value)}
                                type="text"
                                placeholder="John Doe"
                                value={fullName}
                            />

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
                                    Signing Up...
                                </>
                            ) : (
                                "Sign Up"
                            )
                            
                        }                        
                        </button>

                        <p className="text-sm text-center text-slate-800 mt-4">
                            Already have an account?
                            <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors ml-1">
                                Log In
                            </Link>    
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;