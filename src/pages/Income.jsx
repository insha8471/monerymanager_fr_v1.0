import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../utils/axioConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverView from "../components/IncomeOverview";

const Income = () => {
    useUser();

    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show : false,
        data : null
    })

    // fetch all incomes
    const fetchIncomeDetails = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if(response.status === 200) {
                setIncomeData(response.data);
            }
        }catch(error) {
            console.error("Failed to fetch income details:", error);
            toast.error(error.response?.data?.message || "failed to fetch income details");
        }finally{
            setLoading(false);
        }
    }

    // fetch categories for income
    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE('income'));
            if(response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.log('failed to fetch income categories:', error)
            toast.error(error.data?.message || 'failed to fetch income categories');
        }
    }

    // save the income details
    const handleAddIncome = async (income) => {
        const {name, amount, date, icon, categoryId} = income;

        // validation
        if(!name.trim()) {
            toast.error('Please enter a name');
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if(!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if(date > today) {
            toast.error("Date cannot be in the future");
            return;
        }

        if(!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            })

            if(response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully");
                await fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error) {
            console.log("Error adding income:", error);
            toast.error(error.response?.data?.message || "Failed to adding income");
        }
    }

    //delete income details
    const deleteIncome = async (id) => {
        console.log("Front end :", id)
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show:false, data:null})
            toast.success("Income delete successfully.")
            await fetchIncomeDetails();
        } catch (error) {
            console.log("Error deleting income:", error);
            toast.error(error.response?.data?.message || 'failed to delete income');
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    },[])

    return (
        <Dashboard>
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* overview for income with line chart */}
                        
                        <IncomeOverView transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
                    </div>

                    <IncomeList 
                        transactions={incomeData} 
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                    />

                    {/* Add income modal */}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title= 'Add Income'
                    >
                        <AddIncomeForm 
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>

                    {/* Delete income modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Income"
                    >
                        <DeleteAlert 
                            content="Are you sure want to delete this income details."
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </div>
        </Dashboard>
    )
}

export default Income;