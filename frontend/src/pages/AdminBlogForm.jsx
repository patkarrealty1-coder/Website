import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'

const AdminBlogForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isReview = window.location.pathname.includes('/review/')
  const isEdit = Boolean(id) && !isReview

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Market Analysis',
    tags: '',
    status: 'published',
    isFeatured: false,
    author: {
      name: '',
      role: 'Real Estate Expert',
      avatar: ''
    },
    seoTitle: '',
    seoDescription: ''
  })

  const [featuredImage, setFeaturedImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const categories = [
    'Market Analysis', 
    'Buying Guide', 
    'Selling Tips', 
    'Real Estate Investment', 
    'Home Improvement', 
    'Real Estate News', 
    'Lifestyle & Community', 
    'Local Guides', 
    'Legal & Finance',
    'Other'
  ]

  useEffect(() => {
    if (isEdit || isReview) {
      fetchBlog()
    }
  }, [id, isEdit, isReview])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/blogs/${id}`)
      const data = await response.json()
      if (data.success) {
        setFormData({
          ...data.data,
          tags: data.data.tags?.join(', ') || ''
        })
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleImageChange = (e) => {
    setFeaturedImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      if (isReview) {
        // For review mode, update status to published
        const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            status: 'published',
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
          })
        })

        const data = await response.json()

        if (data.success) {
          alert('Blog approved and published successfully!')
          navigate('/management/pending-blogs')
        } else {
          alert(data.message || 'Error approving blog')
        }
      } else {
        // Normal create/edit flow
        const formDataToSend = new FormData()

        Object.keys(formData).forEach(key => {
          if (key === 'tags') {
            formDataToSend.append(key, JSON.stringify(formData[key].split(',').map(t => t.trim()).filter(t => t)))
          } else if (key === 'author') {
            formDataToSend.append(key, JSON.stringify(formData[key]))
          } else {
            formDataToSend.append(key, formData[key])
          }
        })

        if (featuredImage) {
          formDataToSend.append('featuredImage', featuredImage)
        }

        const url = isEdit
          ? `http://localhost:4000/api/blogs/${id}`
          : 'http://localhost:4000/api/blogs'

        const response = await fetch(url, {
          method: isEdit ? 'PATCH' : 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataToSend
        })

        const data = await response.json()

        if (data.success) {
          alert(isEdit ? 'Blog updated successfully!' : 'Blog created successfully!')
          navigate('/management/blogs')
        } else {
          alert(data.message || 'Error saving blog')
        }
      }
    } catch (error) {
      console.error('Error saving blog:', error)
      alert('Error saving blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to={isReview ? "/management/pending-blogs" : "/management/blogs"} 
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isReview ? 'Review Blog' : isEdit ? 'Edit Blog' : 'Add New Blog'}
          </h1>
        </div>

        {/* Warning Banner for Review Mode */}
        {isReview && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-yellow-900 mb-1">
                  Auto-extracted content - please verify before publishing
                </h3>
                <p className="text-sm text-yellow-800">
                  This blog was submitted via API. Please review all information carefully and make any necessary corrections before approving.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="real estate, tips, buying"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Author Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Author Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                <input
                  type="text"
                  name="author.name"
                  value={formData.author.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Role</label>
                <input
                  type="text"
                  name="author.role"
                  value={formData.author.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* SEO Fields */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title (optional)</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  maxLength="60"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description (optional)</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  maxLength="160"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from excerpt</p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Featured Blog</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {featuredImage && (
                <p className="mt-4 text-sm text-gray-600">{featuredImage.name}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-3 text-white rounded-lg disabled:bg-gray-400 ${
                isReview 
                  ? 'bg-green-800 hover:bg-green-900' 
                  : 'bg-green-800 hover:bg-green-900'
              }`}
            >
              {loading 
                ? 'Saving...' 
                : isReview 
                  ? '✓ Approve & Publish' 
                  : isEdit 
                    ? 'Update Blog' 
                    : 'Create Blog'
              }
            </button>
            <Link
              to={isReview ? "/management/pending-blogs" : "/management/blogs"}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminBlogForm

