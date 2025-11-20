import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useState, useEffect } from "react";
import axiosConfig from "../utils/axioConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(false);

    const fetchCategoryDetails = async () => {
        if(loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (response.status === 200) {
                console.log(response.data);
                setCategoryData(response.data)
            }

        } catch (error) {
            console.error("Something went wrong please try again", error);
            toast.error(error.message);
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    },[])

    const handleAddCategory = async (category) => {
        const {name,type,icon} = category;

        if(!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name,type,icon})
            if(response.status === 201) {
                toast.success("category addded successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        }catch(error) {
            console.error("Error adding category:", error);
            toast.error(error.response?.data?.message || "failed to add category");
        }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit)
        setOpenEditCategoryModal(true)
        console.log(categoryToEdit)
    }
    
    const handleUpdateCategory = async (updateCategory) => {
        const {id, name, type, icon} = updateCategory;
        if(!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        if(!id) {
            toast.error("Category id is missing for update.");
            return;
        }

        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("category updated succesfully")
            fetchCategoryDetails();

        } catch (error) {
            console.error("Error updating the category", error.response?.data?.message || error.message)
            toast.error(error.response?.data?.message || "Failed to update category");
        }
        
    }

    return (
        <Dashboard>
            
            <div className="my-5 mx-auto">
                {/* Add button to add category */}
                <div className="flex justify-between items center mb-5">
                    <h2 className="text-2xl font-semibold">
                        All Categories
                    </h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="flex items-center justify-center gap-2 bg-purple-600 text-white font-medium px-3 sm:px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base"
                        >
                            <Plus size={16} className="stroke-[2]" />
                            <span className="sm:inline">Add Category</span>
                    </button>


                </div>
            </div>

            {/* category list */}
            <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

            {/* Adding category modal */}
            <Modal
                isOpen={openAddCategoryModal}
                onClose={() => setOpenAddCategoryModal(false)}
                title="Add Category"
            >
                <AddCategoryForm onAddCategory={handleAddCategory}/>
            </Modal>

            {/* updating category modal */}

            <Modal
                isOpen={openEditCategoryModal}
                onClose={() => {
                    setOpenEditCategoryModal(false)
                    setSelectedCategory(null)
                }}
                title="Update Category"
            >
                <AddCategoryForm
                    initialCategoryData={selectedCategory}
                    onAddCategory={handleUpdateCategory}
                    isEditing={true}
                />
            </Modal>
        </Dashboard>
    )
}

export default Category;