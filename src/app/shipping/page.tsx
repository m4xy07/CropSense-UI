import React from 'react'

const page = () => {
  return (
    <div className="max-w-2xl mx-auto mt-16 p-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold mb-4 text-center text-blue-700">Shipping Policy</h1>
      <p className="text-lg text-gray-800 mb-6 text-center">Thank you for your purchase!</p>
      <p className="mb-6 text-gray-700">
        Please note that all of our products are <span className="font-semibold">100% digital</span> and delivered electronically. As such, <span className="font-semibold">no physical shipping is required</span> and no items will be mailed to you.
      </p>
      <h2 className="text-xl font-bold mb-2 mt-8 text-gray-900">How It Works</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>After completing your purchase, you will receive an instant download link or access via email.</li>
        <li>If you created an account, your product(s) will also be available in your account dashboard for future access.</li>
      </ul>
      <h2 className="text-xl font-bold mb-2 mt-8 text-gray-900">Delivery Timeline</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>Digital products are typically delivered immediately after payment is confirmed.</li>
        <li>In rare cases, there may be a short delay due to payment processing or email provider issues.</li>
      </ul>
      <h2 className="text-xl font-bold mb-2 mt-8 text-gray-900">No Shipping Charges</h2>
      <p className="mb-6 text-gray-700">
        Because there is no physical shipment, you will never be charged for shipping.
      </p>
      <p className="text-gray-700">
        If you have any trouble accessing your digital product, please contact us and we will be happy to help.
      </p>
    </div>
  )
}

export default page
