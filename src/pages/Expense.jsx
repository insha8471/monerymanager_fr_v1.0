import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../utils/axioConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverView from "../components/IncomeOverview";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseOverview from "../components/ExpenseOverview";

const Expense = () => {
    useUser();

    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openExpenseModal, setOpenExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show : false,
        data : null
    })

    // fetch all expense details
    const fetchExpenseDetails = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
            if(response.status === 200) {
                setExpenseData(response.data);
            }
        }catch(error) {
            console.error("Failed to fetch expense details:", error);
            toast.error(error.response?.data?.message || "failed to fetch expense details");
        }finally{
            setLoading(false);
        }
    }

    // fetch categories for expense
    const fetchExpenseCategory = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE('expense'));
            if(response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.log('failed to fetch expense categories:', error)
            toast.error(error.data?.message || 'failed to fetch expense categories');
        }
    }

    // save the expense details
    const handleAddExpense = async (expense) => {
        const {name, amount, date, icon, categoryId} = expense;

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
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            })

            if(response.status === 201) {
                setOpenExpenseModal(false);
                toast.success("Expense added successfully");
                await fetchExpenseDetails();
                fetchExpenseCategory();
            }
        } catch (error) {
            console.log("Error adding expense:", error);
            toast.error(error.response?.data?.message || "Failed to adding expense");
        }
    }

    //delete expense details
    const deleteExpense = async (id) => {
        setLoading(true);
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show:false, data:null})
            toast.success("Expense delete successfully.");
            fetchExpenseDetails();
        } catch (error) {
            console.log("Error deleting expense:", error);
            toast.error(error.response?.data?.message || 'failed to delete expense');
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategory();
    },[])

    return (
        <Dashboard>
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* overview for expense with line chart */}
                        <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenExpenseModal(true)}/>
                    </div>

                    <ExpenseList
                        transactions={expenseData} 
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                    />

                    {/* Add expense modal */}
                    <Modal
                        isOpen={openExpenseModal}
                        onClose={() => setOpenExpenseModal(false)}
                        title= 'Add Expense'
                    >
                        <AddExpenseForm 
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Modal>

                    {/* Delete expense modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Expense"
                    >
                        <DeleteAlert 
                            content="Are you sure want to delete this expense details."
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </div>
        </Dashboard>
    )
}

export default Expense;