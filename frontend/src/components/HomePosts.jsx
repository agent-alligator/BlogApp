import React from 'react';
import { IF } from '../url';

const HomePosts = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl my-8">
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-2/5 relative overflow-hidden">
          <img
            src={IF + post.photo}
            alt={post.title}
            className="w-[380px] h-[200px] object-cover transform transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <p className="text-white font-semibold">@{post.username}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:w-3/5 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800 hover:text-indigo-600 transition-colors duration-300">
              {post.title}
            </h2>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.desc}
              <span className="text-indigo-600 hover:underline cursor-pointer ml-1">
                ...Read more
              </span>
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{Math.ceil(post.desc.split(' ').length / 200)} min read</span>
              </div>
              <div className="flex space-x-2">
                <p>{formatDate(post.updatedAt)}</p>
                <p>{formatTime(post.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePosts;