import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Blog Market</h3>
            <p className="text-sm text-gray-400">
              Empowering voices, connecting ideas, and inspiring readers worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Featured Content</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Featured Blogs</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Most Viewed</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Readers' Choice</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Forum</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Support</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Recent Posts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center flex-col sm:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Blog Market. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;