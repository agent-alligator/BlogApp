import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(`${URL}/api/comments/${id}`, { withCredentials: true });
      window.location.reload(true);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">
              {c.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="font-semibold text-gray-800">@{c.author}</h3>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <p>{formatDate(c.updatedAt)}</p>
          <p>{formatTime(c.updatedAt)}</p>
          {user?._id === c?.userId && (
            <button
              onClick={() => deleteComment(c._id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
              aria-label="Delete comment"
            >
              <MdDelete size={18} />
            </button>
          )}
        </div>
      </div>
      <p className="text-gray-700 mt-2 leading-relaxed">{c.comment}</p>
    </div>
  );
};

export default Comment;