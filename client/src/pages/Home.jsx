import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-900 flex flex-col items-center justfiy-center px-4 sm:px-6 lg:px-8'>
      <div className="max-w-2xl w-full space-y-8 text-center">
            <div className="">
                  <h1 className="text-4xl font-bold text-white sm:tracking-tight lg:text-6">Welcome to Expense App.</h1>
                  <p className="mt-6 text-xl text-gray-300 max-w-prose mx-auto">
      Take control of your finances with our intuitive expense tracking solution.
      Monitor your spending, categorize expense, and gain valuable insights into your financials habits all in one place.
                  </p>
            </div>
            <div className="mt-10">
                  <a href="/login" className='w-48 mx-auto justify-center py-3 px-6 border boredr-transparent rounded-md shadow-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500 transition-colors duration-200'>Get Started</a>
            </div>
            <div className="mt-6 space-y-4">
                  <div className="flex items-center justfiy-center space-x-2">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
                        <span className="text-gray-300">Easy Expense Tracking</span>
                  </div>
                 <div className='flex items-center justify-center space-x-2'>
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
                        <span className="text-gray-300">Detailed Financial insights</span>
               </div>
               <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
                        <span className="text-gray-300">Secure and Reliable</span>
               
               </div>
            </div>
      </div>
    </div>
  )
}

export default Home