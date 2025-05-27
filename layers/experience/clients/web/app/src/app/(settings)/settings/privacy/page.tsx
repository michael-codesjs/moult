'use client';

import Link from 'next/link';

export default function PrivacySettingsPage() {
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
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h1>
      
      {/* Profile Privacy */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile Privacy</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Profile Visibility</h3>
              <p className="text-sm text-gray-500">Control who can see your profile</p>
            </div>
            <div>
              <select className="py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Everyone</option>
                <option>Only Followers</option>
                <option>Only Me</option>
              </select>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Style Collection Visibility</h3>
                <p className="text-sm text-gray-500">Control who can see your collections</p>
              </div>
              <div>
                <select className="py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Everyone</option>
                  <option>Only Followers</option>
                  <option>Only Me</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Show Style Preferences</h3>
                <p className="text-sm text-gray-500">Control who can see your style preferences</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="style-toggle" className="sr-only" defaultChecked />
                <span className="block h-6 w-12 rounded-full bg-purple-600"></span>
                <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform transform translate-x-6"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Communication Privacy */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Communication Privacy</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Direct Messages</h3>
              <p className="text-sm text-gray-500">Control who can send you messages</p>
            </div>
            <div>
              <select className="py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Everyone</option>
                <option>Only Followers</option>
                <option>Nobody</option>
              </select>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Read Receipts</h3>
                <p className="text-sm text-gray-500">Let others know when you've read their messages</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="read-toggle" className="sr-only" defaultChecked />
                <span className="block h-6 w-12 rounded-full bg-purple-600"></span>
                <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform transform translate-x-6"></span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Activity Status</h3>
                <p className="text-sm text-gray-500">Show when you're active on the platform</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="activity-toggle" className="sr-only" defaultChecked />
                <span className="block h-6 w-12 rounded-full bg-purple-600"></span>
                <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform transform translate-x-6"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Privacy */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Data Privacy</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Personalized Recommendations</h3>
              <p className="text-sm text-gray-500">Use your browsing data to improve recommendations</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input type="checkbox" id="recommendations-toggle" className="sr-only" defaultChecked />
              <span className="block h-6 w-12 rounded-full bg-purple-600"></span>
              <span className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full transition-transform transform translate-x-6"></span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Cookie Preferences</h3>
                <p className="text-sm text-gray-500">Manage how we use cookies</p>
              </div>
              <button className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:border-purple-500 transition-colors">
                Manage
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Data Export</h3>
                <p className="text-sm text-gray-500">Request a copy of your personal data</p>
              </div>
              <button className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:border-purple-500 transition-colors">
                Request Data
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Delete Account</h3>
                <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
              </div>
              <button className="py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 