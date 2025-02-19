import { useEffect, useState } from "react"; import axios from "axios"; import { Line } from "react-chartjs-2"; import "chart.js/auto";

function Dashboard() { const [user, setUser] = useState(null); const [transactions, setTransactions] = useState([]); const [balance, setBalance] = useState(0);

useEffect(() => { const token = localStorage.getItem("token"); axios.get("https://ng-fin-manager.onrender.com/api/user", { headers: { Authorization: `Bearer ${token}` }, }) .then((res) => { setUser(res.data); setBalance(res.data.balance || 0); }) .catch(() => setUser(null));

axios.get("https://ng-fin-manager.onrender.com/api/transactions", {
  headers: { Authorization: `Bearer ${token}` },
})
.then((res) => setTransactions(res.data))
.catch(() => setTransactions([]));

}, []);

const chartData = { labels: transactions.map((tx) => new Date(tx.created_at).toLocaleDateString()), datasets: [ { label: "Transaction Amount", data: transactions.map((tx) => tx.amount), borderColor: "#4caf50", fill: false, }, ], };

return ( <div className="dashboard"> <h2>Dashboard</h2> {user ? ( <> <p>Welcome, {user.name}</p> <h3>Balance: ₹{balance}</h3> <div className="sections"> <div className="transactions"> <h3>Recent Transactions</h3> <ul> {transactions.slice(0, 5).map((tx) => ( <li key={tx._id}>{tx.amount} - {tx.status}</li> ))} </ul> </div> <div className="chart"> <h3>Financial Overview</h3> <Line data={chartData} /> </div> </div> <div className="actions"> <button>Send Money</button> <button>Pay Bills</button> </div> </> ) : ( <p>Loading...</p> )} </div> ); }

export default Dashboard;