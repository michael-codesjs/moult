'use client';

import Link from 'next/link';

export default function GeneralSettingsPage() {
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
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">General Settings</h1>
      
      {/* Account Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Account Preferences</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Language</h3>
              <p className="text-sm text-gray-500">Select your preferred language for the app</p>
            </div>
            <div>
              <select className="py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>English (US)</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Units of Measurement</h3>
                <p className="text-sm text-gray-500">Choose your preferred measurement system</p>
              </div>
              <div className="flex space-x-2">
                <button className="py-2 px-4 bg-purple-600 text-white rounded-lg">Metric</button>
                <button className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg">Imperial</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Currency</h3>
                <p className="text-sm text-gray-500">Set your preferred currency for prices</p>
              </div>
              <div>
                <select className="py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>JPY (¥)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-500">Get emails about new styles, recommendations and orders</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input type="checkbox" id="email-toggle" className="sr-only" defaultChecked />
              <span className="block h-6 w-12 rounded-full bg-purple-600"></span>
              <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform transform translate-x-6"></span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Get notifications on your device</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="push-toggle" className="sr-only" defaultChecked />
                <span className="block h-6 w-12 rounded-full bg-purple-600"></span>
                <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform transform translate-x-6"></span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Order Updates</h3>
                <p className="text-sm text-gray-500">Get notified about order status changes</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="order-toggle" className="sr-only" defaultChecked />
                <span className="block h-6 w-12 rounded-full bg-purple-600"></span>
                <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform transform translate-x-6"></span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Marketing Communications</h3>
                <p className="text-sm text-gray-500">Receive promotions and deals</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="marketing-toggle" className="sr-only" />
                <span className="block h-6 w-12 rounded-full bg-gray-300"></span>
                <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* App Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">App Settings</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Dark Mode</h3>
              <p className="text-sm text-gray-500">Switch between light and dark themes</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input type="checkbox" id="dark-toggle" className="sr-only" />
              <span className="block h-6 w-12 rounded-full bg-gray-300"></span>
              <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform"></span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Automatic Updates</h3>
                <p className="text-sm text-gray-500">Keep the app updated automatically</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="updates-toggle" className="sr-only" defaultChecked />
                <span className="block h-6 w-12 rounded-full bg-purple-600"></span>
                <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform transform translate-x-6"></span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Data Saving Mode</h3>
                <p className="text-sm text-gray-500">Reduce data usage when browsing</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="data-toggle" className="sr-only" />
                <span className="block h-6 w-12 rounded-full bg-gray-300"></span>
                <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 