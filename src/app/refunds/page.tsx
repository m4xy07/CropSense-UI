import React from 'react'

const page = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
      <p className="mb-6 text-gray-700">
        We value your satisfaction. If you are not completely satisfied with your purchase, you may be eligible for a refund under the following conditions:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700">
        <li>Refund requests must be made within 14 days of purchase.</li>
        <li>Products must be unused and in their original condition.</li>
        <li>Proof of purchase is required for all refund requests.</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">How to Request a Refund</h2>
      <ol className="list-decimal pl-6 mb-6 text-gray-700">
        <li>Contact our support team at <a href="mailto:support@cropsense.com" className="text-blue-600 underline">support@cropsense.com</a>.</li>
        <li>Provide your order details and reason for the refund.</li>
        <li>Our team will review your request and respond within 3-5 business days.</li>
      </ol>
      <p className="text-gray-600">If you have any questions, please reach out to our support team for assistance.</p>
    </div>
  )
}

export default page
