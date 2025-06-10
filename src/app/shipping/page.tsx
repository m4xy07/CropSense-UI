import React from 'react'

const page = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Shipping Information</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
          <input type="text" id="address" name="address" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
            <input type="text" id="city" name="city" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
            <input type="text" id="state" name="state" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="zip">Zip Code</label>
          <input type="text" id="zip" name="zip" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit</button>
      </form>
    </div>
  )
}

export default page
