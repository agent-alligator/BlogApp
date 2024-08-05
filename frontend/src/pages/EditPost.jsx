import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ImCross } from 'react-icons/im'
import { FiUpload } from 'react-icons/fi'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const EditPost = () => {
  const postId = useParams().id
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + "/api/posts/" + postId)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setFile(res.data.photo)
        setCats(res.data.categories)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPost()
  }, [postId])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats
    }

    if (file && file !== post.photo) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("img", filename)
      data.append("file", file)
      post.photo = filename
      try {
        await axios.post(URL + "/api/upload", data)
      } catch (err) {
        console.log(err)
      }
    }

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, { withCredentials: true })
      navigate("/posts/post/" + res.data._id)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteCategory = (i) => {
    setCats(cats.filter((_, index) => index !== i))
  }

  const addCategory = () => {
    if (cat && !cats.includes(cat)) {
      setCats([...cats, cat])
      setCat("")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className='flex-grow px-6 md:px-[200px] py-8'>
        <h1 className='font-bold text-3xl text-center text-gray-800 mb-8'>Update Post</h1>
        <form className='bg-white shadow-md rounded-lg p-8 space-y-6' onSubmit={handleUpdate}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder='Enter post title'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>
          <div className='flex flex-col space-y-4'>
            <div className='flex items-center space-x-4'>
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className='flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter post category'
                type="text"
              />
              <button
                type="button"
                onClick={addCategory}
                className='bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300'
              >
                Add
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {cats?.map((c, i) => (
                <div key={i} className='flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full'>
                  <p>{c}</p>
                  <button
                    type="button"
                    onClick={() => deleteCategory(i)}
                    className='text-gray-500 hover:text-red-500 transition duration-300'
                  >
                    <ImCross size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={10}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter post description'
          />
          <button
            type="submit"
            className='w-full bg-blue-500 text-white font-semibold px-4 py-3 rounded-md text-xl hover:bg-blue-600 transition duration-300'
          >
            Update Post
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default EditPost