import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">HelpDesk Mini</h1>
          <p className="text-gray-400 text-sm">
            A mini helpdesk system to manage tickets, comments, and users efficiently.
          </p>
        </div>

       
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li>
              <a href="/profile" className="hover:text-indigo-400 transition">Profile</a>
            </li>
            <li>
              <a href="/tickets" className="hover:text-indigo-400 transition">Tickets</a>
            </li>
            <li>
              <a href="/support" className="hover:text-indigo-400 transition">Support</a>
            </li>
          </ul>
        </div>

       
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Connect With Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400 transition"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaTwitter size={24} /></a>
            <a href="#" className="hover:text-blue-600 transition"><FaLinkedin size={24} /></a>
            <a href="#" className="hover:text-gray-100 transition"><FaGithub size={24} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-500 text-sm flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} HelpDesk Mini. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ❤️ by Kumar Ashish</p>
        </div>
      </div>
    </footer>
  );
}
