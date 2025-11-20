import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { User } from "lucide-react"
import { SIDE_BAR_DATA } from "../assets/assets"
import { NavLink, useNavigate } from "react-router-dom"

const Sidebar = () => {
    const navigate = useNavigate();
    const {user} = useContext(AppContext)
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img 
                        src={user.profileImageUrl}
                        alt="profile image" 
                        className="w-20 h-20 rounded-full bg-slate-400 object-cover" />
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100">
                        <User className="w-10 h-20 text-xl" />
                    </div>
                )}
                <h5 className="text-gray-950 font-medeium leading-6 mb-5">
                    {user.name || ""}
                </h5>

                {SIDE_BAR_DATA.map((item, index) => (
                    <NavLink
                        key={`menu_${index}`}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition ${
                            isActive
                                ? "bg-purple-800 text-white font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </NavLink>
                    ))}
            </div>
        </div>
    )
}

export default Sidebar;