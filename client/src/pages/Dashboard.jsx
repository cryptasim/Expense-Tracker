import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import ExpenseChart from "../components/ExpenseChart";

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses");
        setExpenses(res.data);
      } catch (err) {
        alert("Failed to fetch expenses");
      }
    };
    fetchExpenses();
  }, []);

  const totalExpense = expenses.reduce(
    (total, exp) => total + Number(exp.amount),
    0
  );

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/expenses", newExpense);
      setExpenses([...expenses, res.data]);
      setNewExpense({ title: "", amount: "", category: "", date: "" });
    } catch (err) {
      alert("Failed to add expense");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      alert("Failed to delete expense");
    }
  };

  const startEditing = (expense) => {
    setEditingId(expense._id);
    setEditForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.split("T")[0],
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ title: "", amount: "", category: "", date: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const updated = await api.put(`/expenses/${id}`, editForm);
      setExpenses(expenses.map((exp) => (exp._id === id ? updated.data : exp)));
      setEditingId(null);
      setEditForm({ title: "", amount: "", category: "", date: "" });
    } catch (err) {
      alert("Failed to update expense");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, <span className="text-indigo-600">{user?.name}</span>
          </h1>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Spent", value: `₹ ${totalExpense.toFixed(2)}` },
            { title: "Transactions", value: expenses.length },
            {
              title: "Average Expense",
              value: `₹ ${(totalExpense / (expenses.length || 1)).toFixed(2)}`,
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:border-indigo-200 transition-all"
            >
              <div className="text-sm font-medium text-indigo-600 mb-4">
                {stat.title}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">This month</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Spending Analytics
                </h2>
                <p className="text-sm text-gray-500">
                  Your expense distribution
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-gray-50/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                  Expense Timeline
                </h3>
                <div className="h-[200px]">
                  <ExpenseChart type="bar" expenses={expenses} />
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-gray-50/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                  Category Distribution
                </h3>
                <div className="h-[200px]">
                  <ExpenseChart type="pie" expenses={expenses} />
                </div>
              </div>
            </div>

            {/* Analytics Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Highest Expense
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ₹
                  {Math.max(
                    ...expenses.map((e) => Number(e.amount)),
                    0
                  ).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Lowest Expense
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ₹
                  {Math.min(
                    ...(expenses.length
                      ? expenses.map((e) => Number(e.amount))
                      : [0])
                  ).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Most Common Category
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {expenses.length
                    ? Object.entries(
                        expenses.reduce((acc, curr) => {
                          acc[curr.category] = (acc[curr.category] || 0) + 1;
                          return acc;
                        }, {})
                      ).sort((a, b) => b[1] - a[1])[0][0]
                    : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">
                  Daily Average
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ₹{(totalExpense / (expenses.length || 1)).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Add Form */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Add
            </h2>
            <form onSubmit={handleNewSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={newExpense.title}
                onChange={handleNewChange}
                placeholder="Title"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                         placeholder-gray-400 text-gray-900 transition-all duration-300"
                required
              />
              <input
                type="number"
                name="amount"
                value={newExpense.amount}
                onChange={handleNewChange}
                placeholder="Amount"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                         placeholder-gray-400 text-gray-900 transition-all duration-300"
                required
              />
              <input
                type="text"
                name="category"
                value={newExpense.category}
                onChange={handleNewChange}
                placeholder="Category"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                         placeholder-gray-400 text-gray-900 transition-all duration-300"
                required
              />
              <input
                type="date"
                name="date"
                value={newExpense.date}
                onChange={handleNewChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                         text-gray-900 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                         transition-all duration-300 font-medium tracking-wide"
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h2>
            <p className="text-gray-600 text-sm">Your latest expenses</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense._id} className="hover:bg-gray-50">
                    {editingId === expense._id ? (
                      <>
                        <td colSpan="5" className="px-6 py-4">
                          <form
                            onSubmit={(e) => handleEditSubmit(e, expense._id)}
                            className="flex flex-wrap gap-4"
                          >
                            <input
                              type="text"
                              name="title"
                              value={editForm.title}
                              onChange={handleEditChange}
                              placeholder="Title"
                              className="flex-1 min-w-[200px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                            <input
                              type="number"
                              name="amount"
                              value={editForm.amount}
                              onChange={handleEditChange}
                              placeholder="Amount"
                              className="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                            <input
                              type="text"
                              name="category"
                              value={editForm.category}
                              onChange={handleEditChange}
                              placeholder="Category"
                              className="w-40 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                            <input
                              type="date"
                              name="date"
                              value={editForm.date}
                              onChange={handleEditChange}
                              className="w-40 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={cancelEditing}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {expense.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{expense.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => startEditing(expense)}
                              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(expense._id)}
                              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
