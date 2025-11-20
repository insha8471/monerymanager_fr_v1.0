import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Inputs from "./Inputs";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({onAddExpense, categories}) => {
    const [loading,setLoading] = useState(false);
    const [expense, setExpense] = useState({
        name:'',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    })

    const categoryOptions = categories.map(category => ({
        value : category.id,
        label: category.name
    }))

    const handleChange = (key, value) => {
        setExpense({...expense, [key]: value});
    }

    const handleAddExpense = async () => {
        setLoading(true);
        try {
            onAddExpense(expense);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({...prev, categoryId: categories[0].id}));
        }
    }, [categories, expense.categoryId])

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Inputs
                value={expense.name}
                onChange={(e) => handleChange('name', e.target.value)}
                label='Expense Sources'
                placeholder="e.g. Salry,Freelance, Bonus"
                type='text'
            />

            <Inputs
                value={expense.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                label='Category'
                isSelect={true}
                options={categoryOptions}
            />

            <Inputs
                value={expense.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                label='Amount'
                placeholder="e.g. 500.00"
                type='number'
            />

            <Inputs
                value={expense.date}
                onChange={(e) => handleChange('date', e.target.value)}
                label='Date'
                placeholder=""
                type='date'
            />

            <div className="flex justify-end mt-6">
                <button 
                    onClick={handleAddExpense}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-purple-600 text-white font-medium px-3 sm:px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base cursor-pointer">
                    {
                        loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                Adding...
                            </>
                        ) : (
                            <>
                                Add Expense
                            </>
                        )
                    }
                </button>
            </div>

        </div>
    )
}

export default AddExpenseForm;