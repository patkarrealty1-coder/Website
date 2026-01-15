import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminPageContent = () => {
  const [selectedPage, setSelectedPage] = useState('faq')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  
  const [pageData, setPageData] = useState({
    pageType: 'faq',
    title: '',
    content: '',
    sections: [],
    faqs: [],
    contactInfo: {}
  })

  const pageTypes = [
    { value: 'faq', label: 'FAQ' },
    { value: 'contact', label: 'Contact Us' },
    { value: 'about', label: 'About Us' },
    { value: 'privacy-policy', label: 'Privacy Policy' },
    { value: 'terms-conditions', label: 'Terms & Conditions' }
  ]

  useEffect(() => {
    fetchPageContent(selectedPage)
  }, [selectedPage])

  const fetchPageContent = async (pageType) => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:4000/api/page-content/${pageType}`)
      const data = await response.json()
      
      if (data.success) {
        setPageData(data.data)
      } else {
        // Initialize empty structure
        setPageData({
          pageType,
          title: '',
          content: '',
          sections: [],
          faqs: pageType === 'faq' ? [{ question: '', answer: '', order: 0 }] : [],
          contactInfo: pageType === 'contact' ? { phone: '', email: '', address: '', officeHours: '' } : {}
        })
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem('token')
      
      const response = await fetch('http://localhost:4000/api/page-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pageData)
      })

      const data = await response.json()
      
      if (data.success) {
        setMessage('Content saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Error saving content')
      }
    } catch (error) {
      setMessage('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const addFAQ = () => {
    setPageData({
      ...pageData,
      faqs: [...pageData.faqs, { question: '', answer: '', order: pageData.faqs.length }]
    })
  }

  const removeFAQ = (index) => {
    setPageData({
      ...pageData,
      faqs: pageData.faqs.filter((_, i) => i !== index)
    })
  }

  const updateFAQ = (index, field, value) => {
    const newFaqs = [...pageData.faqs]
    newFaqs[index][field] = value
    setPageData({ ...pageData, faqs: newFaqs })
  }

  const addSection = () => {
    setPageData({
      ...pageData,
      sections: [...pageData.sections, { heading: '', content: '', order: pageData.sections.length }]
    })
  }

  const removeSection = (index) => {
    setPageData({
      ...pageData,
      sections: pageData.sections.filter((_, i) => i !== index)
    })
  }

  const updateSection = (index, field, value) => {
    const newSections = [...pageData.sections]
    newSections[index][field] = value
    setPageData({ ...pageData, sections: newSections })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/management" className="p-2 hover:bg-gray-200 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Manage Page Content</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {message}
          </div>
        )}

        {/* Page Selector */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Page to Edit</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {pageTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedPage(type.value)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedPage === type.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
              <input
                type="text"
                value={pageData.title}
                onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter page title"
              />
            </div>

            {/* FAQ Specific */}
            {selectedPage === 'faq' && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">FAQ Items</h3>
                  <button
                    onClick={addFAQ}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add FAQ
                  </button>
                </div>
                {pageData.faqs?.map((faq, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium text-gray-600">FAQ #{index + 1}</span>
                      <button
                        onClick={() => removeFAQ(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                      placeholder="Question"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows="3"
                      placeholder="Answer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Contact Specific */}
            {selectedPage === 'contact' && (
              <div className="mb-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <input
                  type="text"
                  value={pageData.contactInfo?.phone || ''}
                  onChange={(e) => setPageData({ ...pageData, contactInfo: { ...pageData.contactInfo, phone: e.target.value }})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Phone Number"
                />
                <input
                  type="email"
                  value={pageData.contactInfo?.email || ''}
                  onChange={(e) => setPageData({ ...pageData, contactInfo: { ...pageData.contactInfo, email: e.target.value }})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Email Address"
                />
                <textarea
                  value={pageData.contactInfo?.address || ''}
                  onChange={(e) => setPageData({ ...pageData, contactInfo: { ...pageData.contactInfo, address: e.target.value }})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Office Address"
                />
                <input
                  type="text"
                  value={pageData.contactInfo?.officeHours || ''}
                  onChange={(e) => setPageData({ ...pageData, contactInfo: { ...pageData.contactInfo, officeHours: e.target.value }})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Office Hours"
                />
              </div>
            )}

            {/* Sections (for About, Privacy, Terms) */}
            {['about', 'privacy-policy', 'terms-conditions'].includes(selectedPage) && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Content Sections</h3>
                  <button
                    onClick={addSection}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Section
                  </button>
                </div>
                {pageData.sections?.map((section, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium text-gray-600">Section #{index + 1}</span>
                      <button
                        onClick={() => removeSection(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={section.heading}
                      onChange={(e) => updateSection(index, 'heading', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                      placeholder="Section Heading"
                    />
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(index, 'content', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows="5"
                      placeholder="Section Content"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* General Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Content</label>
              <textarea
                value={pageData.content || ''}
                onChange={(e) => setPageData({ ...pageData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="6"
                placeholder="Additional page content..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPageContent
