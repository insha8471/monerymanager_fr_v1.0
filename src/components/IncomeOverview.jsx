import { useEffect, useState } from "react"
import { prepareIncomeLineCharData } from "../utils/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverView = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
    if (!transactions || transactions.length === 0) {
        setChartData([]);
        return;
    }

    const result = prepareIncomeLineCharData(transactions);
    setChartData(result);
}, [transactions]);

    return (
    <div className="card">
        <div className="flex items-center justify-between">
            <div>
                <h5 className="text-lg">
                    Income Overview
                </h5>
                <p className="text-xs text-gray-400 mt-5">
                    Track Your earning over time and analyze your income tends.
                </p>
            </div>
            <button 
                className="flex items-center justify-center gap-2 bg-purple-600 text-white font-medium px-3 sm:px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base"
                onClick={onAddIncome}>
                    <Plus size={15} className="text-lg" />
                    <span>Add Income</span>
            </button>
        </div>

        <div className="mt-10">
            <CustomLineChart data={chartData} />
        </div>
    </div>
    )
}

export default IncomeOverView;