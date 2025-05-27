'use client';

import Link from 'next/link';

export default function PaymentMethodsPage() {
  // Mock payment methods
  const paymentMethods = [
    {
      id: 'card-1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '2024',
      isDefault: false
    }
  ];

  // Mock billing addresses
  const billingAddresses = [
    {
      id: 'addr-1',
      name: 'Alex Morgan',
      line1: '123 Fashion Ave',
      line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'Alex Morgan',
      line1: '456 Style Street',
      line2: '',
      city: 'Boston',
      state: 'MA',
      zip: '02108',
      country: 'United States',
      isDefault: false
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/profile" className="flex items-center text-purple-600 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Profile
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h1>
      
      {/* Payment Cards */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Payment Cards</h2>
          <button className="flex items-center text-purple-600 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Card
          </button>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map((card) => (
            <div key={card.id} className={`border rounded-lg p-4 ${card.isDefault ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-14 mr-3 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                    {card.type === 'visa' && (
                      <span className="text-xs font-bold tracking-wider">VISA</span>
                    )}
                    {card.type === 'mastercard' && (
                      <span className="text-xs font-bold">MC</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {card.type === 'visa' ? 'Visa' : 'Mastercard'} ending in {card.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {card.isDefault && (
                    <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full mr-2">
                      Default
                    </span>
                  )}
                  <button className="text-sm text-gray-500 hover:text-purple-600">
                    Edit
                  </button>
                  <span className="text-gray-300 mx-2">|</span>
                  <button className="text-sm text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Billing Addresses */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Billing Addresses</h2>
          <button className="flex items-center text-purple-600 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Address
          </button>
        </div>
        
        <div className="space-y-4">
          {billingAddresses.map((address) => (
            <div key={address.id} className={`border rounded-lg p-4 ${address.isDefault ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}>
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">{address.name}</p>
                  <p className="text-sm text-gray-500">{address.line1}</p>
                  {address.line2 && <p className="text-sm text-gray-500">{address.line2}</p>}
                  <p className="text-sm text-gray-500">
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p className="text-sm text-gray-500">{address.country}</p>
                </div>
                <div className="flex flex-col items-end">
                  {address.isDefault && (
                    <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full mb-2">
                      Default
                    </span>
                  )}
                  <div>
                    <button className="text-sm text-gray-500 hover:text-purple-600">
                      Edit
                    </button>
                    <span className="text-gray-300 mx-2">|</span>
                    <button className="text-sm text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Payment History */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Payment History</h2>
          <button className="text-sm text-purple-600 font-medium">View All</button>
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-medium text-gray-900">Order #12345</p>
              <p className="text-sm text-gray-500">Feb 15, 2024</p>
            </div>
            <p className="font-medium text-gray-900">$209.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Visa ending in 4242</p>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Completed
            </span>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-medium text-gray-900">Order #12344</p>
              <p className="text-sm text-gray-500">Jan 23, 2024</p>
            </div>
            <p className="font-medium text-gray-900">$169.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Mastercard ending in 5555</p>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Completed
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-medium text-gray-900">Order #12343</p>
              <p className="text-sm text-gray-500">Dec 10, 2023</p>
            </div>
            <p className="font-medium text-gray-900">$145.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Visa ending in 4242</p>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 