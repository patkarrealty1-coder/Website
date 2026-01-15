import { useState, useEffect } from 'react'
import { Users, Phone, Mail, MapPin, Calendar, Filter, Trash2, Eye, X, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const AdminLeads = () => {
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState(null)

  useEffect(() => {
    fetchLeads()
    fetchStats()
  }, [filter])

  const fetchLeads = async () => {
    try {
      const url = filter === 'all' ? `${API_URL}/leads` : `${API_URL}/leads?status=${filter}`
      const response = await fetch(url)
      const data = await response.json()
      if (data.success) setLeads(data.data)
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/leads/stats`)
      const data = await response.json()
      if (data.success) setStats(data.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (response.ok) {
        fetchLeads()
        fetchStats()
      }
    } catch (error) {
      console.error('Error updating lead:', error)
    }
  }

  const updatePriority = async (id, priority) => {
    try {
      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority })
      })
      if (response.ok) fetchLeads()
    } catch (error) {
      console.error('Error updating priority:', error)
    }
  }

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return
    try {
      await fetch(`${API_URL}/leads/${id}`, { method: 'DELETE' })
      fetchLeads()
      fetchStats()
    } catch (error) {
      console.error('Error deleting lead:', error)
    }
  }

  const statusColors = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'in-progress': 'bg-purple-100 text-purple-700 border-purple-200',
    'site-visit-scheduled': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    negotiation: 'bg-orange-100 text-orange-700 border-orange-200',
    converted: 'bg-green-100 text-green-700 border-green-200',
    closed: 'bg-gray-100 text-gray-700 border-gray-200',
    lost: 'bg-red-100 text-red-700 border-red-200'
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-blue-100 text-blue-600',
    high: 'bg-orange-100 text-orange-600',
    urgent: 'bg-red-100 text-red-600'
  }

  const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-gray-600 mt-1">Manage inquiries from the recommendations form</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Leads</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in-progress">In Progress</option>
              <option value="site-visit-scheduled">Site Visit Scheduled</option>
              <option value="negotiation">Negotiation</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>

        {/* Enhanced Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-blue-700 font-semibold">Total Leads</p>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 shadow-sm border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-yellow-700 font-semibold">New</p>
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-900">{stats.new}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 shadow-sm border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-purple-700 font-semibold">In Progress</p>
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-900">{stats.inProgress}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-sm border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-green-700 font-semibold">Converted</p>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-900">{stats.converted}</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 shadow-sm border border-indigo-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-indigo-700 font-semibold">This Month</p>
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-indigo-900">{stats.thisMonth}</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 shadow-sm border border-emerald-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-emerald-700 font-semibold">Conv. Rate</p>
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-emerald-900">{stats.conversionRate}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No leads found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Requirements</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map(lead => (
                    <tr key={lead._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {lead.email}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {lead.phone}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm"><span className="text-gray-500">Type:</span> {lead.formattedPropertyType || lead.propertyType}</p>
                        <p className="text-sm"><span className="text-gray-500">Budget:</span> {lead.formattedBudget || lead.budgetRange}</p>
                        <p className="text-sm flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" /> {lead.preferredLocality}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.priority || 'medium'}
                          onChange={(e) => updatePriority(lead._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[lead.priority || 'medium']} border-0 cursor-pointer`}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[lead.status]} cursor-pointer`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in-progress">In Progress</option>
                          <option value="site-visit-scheduled">Site Visit</option>
                          <option value="negotiation">Negotiation</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {formatDate(lead.createdAt)}
                        </p>
                        {lead.daysSinceCreated && (
                          <p className="text-xs text-gray-400 mt-1">{lead.daysSinceCreated} days ago</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteLead(lead._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p><strong>Name:</strong> {selectedLead.name}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[selectedLead.priority || 'medium']}`}>
                  {(selectedLead.priority || 'medium').toUpperCase()}
                </span>
              </div>
              <p><strong>Email:</strong> {selectedLead.email}</p>
              <p><strong>Phone:</strong> {selectedLead.phone}</p>
              <p><strong>Property Type:</strong> {selectedLead.formattedPropertyType || selectedLead.propertyType}</p>
              <p><strong>Budget:</strong> {selectedLead.formattedBudget || selectedLead.budgetRange}</p>
              <p><strong>Locality:</strong> {selectedLead.preferredLocality}</p>
              <p><strong>Source:</strong> {selectedLead.source || 'website-form'}</p>
              <p><strong>Status:</strong> <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[selectedLead.status]}`}>{selectedLead.status}</span></p>
              <p><strong>Submitted:</strong> {formatDate(selectedLead.createdAt)}</p>
              {selectedLead.daysSinceCreated && (
                <p className="text-sm text-gray-500">({selectedLead.daysSinceCreated} days ago)</p>
              )}
              {selectedLead.lastContactedAt && (
                <p><strong>Last Contacted:</strong> {formatDate(selectedLead.lastContactedAt)}</p>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <a href={`tel:${selectedLead.phone}`} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center font-medium hover:bg-green-700">
                Call Now
              </a>
              <a href={`mailto:${selectedLead.email}`} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center font-medium hover:bg-blue-700">
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLeads
