import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Contact Us</h1>
      <p className="mb-8 text-gray-700 max-w-xl text-center">
        Have questions, feedback, or need support? Fill out the form below and our team will get back to you as soon as possible.
      </p>
      <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea id="message" name="message" rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">Send Message</button>
      </form>
      <div className="mt-8 text-gray-600 text-center">
        <p>Email: <a href="mailto:support@cropsense.com" className="text-green-700 underline">support@cropsense.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="text-green-700 underline">+1 234 567 890</a></p>
        <p className="mt-2">CropSense, 123 Agri Lane, Farm City, Country</p>
      </div>
    </div>
  )
}

export default page
