'use client';

import Link from 'next/link';

export default function SecuritySettingsPage() {
  // Mock active sessions data
  const activeSessions = [
    {
      device: 'iPhone 14 Pro',
      browser: 'Safari',
      location: 'New York, USA',
      ip: '192.168.1.xx',
      lastActive: 'Now'
    },
    {
      device: 'MacBook Pro',
      browser: 'Chrome',
      location: 'New York, USA',
      ip: '192.168.1.xx',
      lastActive: '2 hours ago'
    },
    {
      device: 'iPad Air',
      browser: 'Safari',
      location: 'Boston, USA',
      ip: '192.168.2.xx',
      lastActive: '3 days ago'
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
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h1>
      
      {/* Password Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Password</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <button className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Update
            </button>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Password Last Changed</h3>
                <p className="text-sm text-gray-500">July 15, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">2FA Status</h3>
              <p className="text-sm text-gray-500">Additional security for your account</p>
            </div>
            <div className="flex items-center">
              <span className="block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
              <span className="text-sm text-gray-700 mr-3">Not Enabled</span>
              <button className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Enable
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Verification Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="radio" id="app" name="verification" className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
                  <label htmlFor="app" className="ml-2 block text-sm text-gray-900">
                    Authenticator App
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="sms" name="verification" className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
                  <label htmlFor="sms" className="ml-2 block text-sm text-gray-900">
                    SMS Verification
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="email" name="verification" className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
                  <label htmlFor="email" className="ml-2 block text-sm text-gray-900">
                    Email Verification
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Active Sessions</h2>
          <button className="text-sm text-purple-600 font-medium">Sign Out All Devices</button>
        </div>
        
        <div className="space-y-4">
          {activeSessions.map((session, index) => (
            <div key={index} className={`border ${index === 0 ? 'border-purple-200 bg-purple-50' : 'border-gray-100'} rounded-lg p-4`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${index === 0 ? 'text-purple-600' : 'text-gray-500'} mr-2`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium text-gray-900">{session.device} • {session.browser}</p>
                    {index === 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {session.location} • IP: {session.ip}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 mr-3">
                    {session.lastActive}
                  </p>
                  {index !== 0 && (
                    <button className="text-sm text-red-600">
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Security Log */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Security Log</h2>
          <button className="text-sm text-purple-600 font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="mt-1 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-900">Successful login from New York</p>
              <p className="text-xs text-gray-500">Today, 10:15 AM</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="mt-1 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-900">Password changed</p>
              <p className="text-xs text-gray-500">July 15, 2023, 6:30 PM</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="mt-1 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-900">Failed login attempt from Chicago</p>
              <p className="text-xs text-gray-500">July 10, 2023, 8:45 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 