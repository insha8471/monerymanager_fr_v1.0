import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/axioConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import Transactions from "../components/Transactons";
import Infocard from "../components/Infocard";

const Home = () => {
    useUser();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if(loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);

            if(response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log('Something went wrong while fetching dashboard data:', error);
            toast.error('Something went wrong');
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    },[])
    return (
        <Dashboard>
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* display the card */}

                    <Infocard
                        icon={<WalletCards />}
                        label="Total Balance"
                        value="10000"
                        color="bg-purple-800"
                    />

                    <Infocard 
                        icon={<Wallet />}
                        label="Total Income"
                        value="10000"
                        color="bg-green-800"
                    />

                    <Infocard
                        icon={<Coins />}
                        label="Total Expense"
                        value="10000"
                        color="bg-red-800"
                    />
                </div>

                <div className="grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Recent Transactions */}
                    <RecentTransactions 
                        transactions={dashboardData?.recentTransactions}
                        onMore={() => navigate("/expense")}
                    />
                </div>

                {/* Income Transactons */}
                <Transactions 
                    transactions={dashboardData?.recentTransactions || []}
                    onMore={() => navigate("/income")}
                    type="income"
                    title="Recent Incomes"
                />

                {/* Expense Transactons */}
                <Transactions 
                    transactions={dashboardData?.recentTransactions || []}
                    onMore={() => navigate("/expense")}
                    type="expense"
                    title="Recent Expense"
                />
                
            </div>
        </Dashboard>
    )
}

export default Home;