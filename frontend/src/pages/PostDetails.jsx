import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${postId}`);
        console.log("data from backend", res.data)
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchPostComments = async () => {
      setLoader(true);
      try {
        const res = await axios.get(`${URL}/api/comments/post/${postId}`);
        setComments(res.data);
        setLoader(false);
      } catch (err) {
        setLoader(false);
        console.log(err);
      }
    };
    fetchPostComments();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/api/comments/create`,
        { comment, author: user.username, postId, userId: user._id },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (loader) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
              {user?._id === post?.userId && (
                <div className="flex items-center space-x-2">
                  <button onClick={() => navigate(`/edit/${postId}`)} className="text-blue-500 hover:text-blue-700">
                    <BiEdit size={24} />
                  </button>
                  <button onClick={handleDeletePost} className="text-red-500 hover:text-red-700">
                    <MdDelete size={24} />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <p>@{post.username}</p>
              <div>
                <time dateTime={post.updatedAt}>
                  {new Date(post.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </time>
              </div>
            </div>
          </div>
          {post.photo && (
            <div className="px-6 pb-4">
              <img
                src={IF + post.photo}
                className="w-full max-h-[250px] max-w-[400px] object-cover rounded-lg"
                alt=""
                height={250}
                width={300}
              />
            </div>
          )}
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">{post.desc}</p>
            {post.categories && post.categories.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900">Categories:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.categories.map((category, index) => (
                    <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <section className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments</h3>
            <div className="space-y-4">
              {comments.map((c) => (
                <Comment key={c._id} c={c} post={post} />
              ))}
            </div>
            <form onSubmit={postComment} className="mt-6">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Write a comment"
                  className="flex-grow rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white px-4 py-2"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="rounded-r-lg px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetails;