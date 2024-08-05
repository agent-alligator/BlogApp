/* eslint-disable react/prop-types */
import { IF } from '../url'

const ProfilePosts = ({ p }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-102 hover:shadow-lg mt-8">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 h-64 md:h-auto">
          <img src={IF + p.photo} alt="" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        </div>
        
        {/* Content */}
        <div className="p-6 md:w-2/3">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition-colors duration-300">
            {p.title}
          </h1>
          
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <p className="font-medium">@{p.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(p.updatedAt).toLocaleDateString()}</p>
              <p>{new Date(p.updatedAt).toLocaleTimeString()}</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">
            {p.desc.slice(0, 200)}
            <span className="text-indigo-600 hover:underline cursor-pointer"> ...Read more</span>
          </p>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300">
              Read Full Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePosts