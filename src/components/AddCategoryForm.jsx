import { useEffect, useState } from "react";
import Inputs from "./Inputs";
import { LoaderCircle, Target } from "lucide-react";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = ({onAddCategory, initialCategoryData, isEditing}) => {

    const [isLoading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon:""
    })

    useEffect(() => {
        if(isEditing && initialCategoryData) {
            setCategory(initialCategoryData)
        }else {
            setCategory({name:"", type:"income", icon:"" })
        }
    },[isEditing, initialCategoryData])

    const categoryTypeOption = [
        {value : "income", label: "Income"},
        {value: "expense", label: "Expense"}
    ]

    const handleChange = (key, value) => {
        setCategory({...category,[key]: value})
    }

    const handleSubmit = async () => {
        setLoading(true)
        try{
            await onAddCategory(category);
        }finally {
            setLoading(false)
        }
        
    }

    return (
        <div className="p-4">

            <EmojiPickerPopup 
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon",  selectedIcon)}
            />

            <Inputs 
                value={category.name}
                onChange={({target}) => handleChange("name", target.value)}
                label="Category Name"
                placeholder="e.g., Freelance, Salary, Groceries"
                type="text"

            />

            <Inputs 
                value={category.type}
                label="Category Type"
                onChange={({target}) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypeOption}
            />

            <div className="flex justify-end mt-6">
                <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-5 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 transition-all duration-200">
                    {
                        isLoading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                {isEditing ? "Updating..." : "Adding..."}
                            </>
                        ) : (
                            <>
                                {isEditing ? "update Category" : "Add category"}
                            </>
                        )
                    }
                    
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm;