import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const formCurrency = (amount) => {
      return new Intl.NumberFormat('en-ET', {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
      }).format(amount)
}
const Dashbaord = () => {
      const [userData, setUserData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [sidebarOpen, setSidebarOpen] = useState(false)
      const [expenses, setExpenses] = useState([]);
      const [totalExpenses, setTotalExpenses] = useState(0);
      const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
      const [editingExpense, setEditingExpense] = useState(null);
      const navigate = useNavigate();

      useEffect(() => {
            fetchUserData(),
                  fetchExpenses();
      }, [])
      const fetchUserData = async () => {
            try {
                  const response = await api.get('/auth/profile')
                  setUserData(response.data)
            } catch (error) {
                  setError('Failed to fetch user data')
                  if (error.response?.status === 401) {
                        handleLogout();
                  }  
            }finally {
                  setLoading(false)
            }
      }


      const fetchExpenses = async () => {
            try {
                  const response = await api.get('/expenses')
                  setExpenses(response.data)
                  setTotalExpenses(response.data.reduce((acc, curr) => acc + curr.amount, 0))
            } catch (error) {
                  console.error('failed to fetch expenses')
                  setError('Failed to fetch expenses')
            }
      }
      const handleLogout = () => {
            localStorage.removeItem('token')
            navigate('/home')
      }

      const handleExpenseAdded = (newExpense) => {
            if (editingExpense) {
                  setExpenses(prev => prev.map(exp => exp.id === newExpense.id ? newExpense : exp))
                  setTotalExpenses(prev  =>prev-editingExpense.amount+newExpense.amount)
                  setEditingExpense(null);
            }else{
                  setExpenses(prev => [newExpense, ...prev]);
                  setTotalExpenses(prev => prev + newExpense.amount);
            }
      }

      const handleDeleteExpense = async(id)=>{
            if (window.confirm('are you sure to delete this')){
                  try {
                        await api.delete(`/expenses/${id}`);
                        setExpenses(prev => prev.filter(exp => exp.id!== id));
                        const deleteExpense = expenses.find(expense => expense.id === id)
                        setTotalExpenses(prev => prev - deleteExpense.amount);
                  } catch (error) {
                        console.log('Delete Expense Error')
                        setError('failed to delete expense')
                  }
            }
      }

const handleUpdateExpense = (expense)=>{
      setEditingExpense(expense)
      setIsExpenseFormOpen(true)
}
if(loading){
      return(
            <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
                  <div className='animate-spin rouned-full h-12 w-12 border-b2 border-primary-500'>
                  </div>
            </div>
      )
}

      return (
            <div className='min-h-screen bg-gray-900'>
                  {/* Navigation */}
                  <nav className='bg-gray-800 shadow-sm'>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="flex justify-between h-1">
                                    <div className="flex">
                                          <button
                                          onClick={()=>setSidebarOpen(!sidebarOpen)} 
                                          className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden">
                                                <span className="sr-only">Open sidebar</span>
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 16h16M4 20h16" />
                                                </svg>
                                          </button>

                                          <div className="flex-shrink-0 flex items-center">
                                                <h1 className="text-xl font-bold">Expense Management</h1>
                                          </div>
                                    </div>
                                    <div className="flex-items-center">
                                          <button className="ml-4 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-md">
                                                logout
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </nav>

                  {/* sidebar */}
                  <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={()=>setSidebarOpen(false)}></div>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                              <nav className="mt-5 px-2 space-y-1">
                                    <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-gray-900">
                                          Dashboard
                                    </a>
                                    <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-gray-900">
                                          Profile
                                    </a>
                              </nav>
                        </div>
                  </div>
                  {/* main content */}
                  <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
                        <div className="py-6">
                              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    {
                                          error && (
                                                <div className="mb-4 bg-red-900/50 border-red-500 text-red-200 px-4 py-3 rounded relative">
                                                      {error}
                                                </div>
                                          )}
                                          {
                                                userData &&(
                                                     <div className="space-y-6">
                                                       <div className="bg-gray-800 shadow rounded-lg p-6">
                                                            <h1 className="text-2xl font-bold text-white mb-2">
                                                                  welcome, {userData.name}
                                                            </h1>
                                                            <p className="text-gray-300">Email: {userData.email}</p>
                                                            <p className="text-sm text-gray-400">
                                                                  Member Since: {new Date(userData.createdAt).toLocaleDateString}
                                                            </p>
                                                       </div>
                                                     </div>
                                                )
                                          }
                              </div>
                        </div>

                  </main>
            </div>
      )
}

export default Dashbaord