import React from 'react'

const page = () => {
  return (
    <div className="max-w-xl mx-auto mt-20 p-10 bg-white rounded-lg shadow-md flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-green-700">No Shipping Required</h1>
      <div className="flex flex-col items-center">
        <svg className="w-20 h-20 mb-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#d1fae5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" />
        </svg>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Great news! Our service is fully digital and does not require any shipping. All products and features are delivered instantly online.
        </p>
        <p className="text-md text-gray-500 text-center">
          If you have any questions or need assistance, please contact our support team.
        </p>
      </div>
    </div>
  )
}

export default page
