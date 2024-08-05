import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id: param } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${URL}/api/users/${user._id}`);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [param, user._id]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPosts();
  }, [param, user._id]);

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      await axios.put(`${URL}/api/users/${user._id}`, { username, email }, { withCredentials: true });
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-6">Profile</h1>
              <div className="space-y-4">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your username"
                  type="text"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                  type="email"
                />
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleUserUpdate}
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleUserDelete}
                    className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
                {updated && (
                  <p className="text-green-500 text-sm text-center mt-2">
                    User updated successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-2xl font-bold mb-6">Your posts</h1>
            <div className="space-y-6">
              {posts.map((p) => (
                <ProfilePosts key={p._id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;