import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus, CheckCircle } from 'lucide-react'

const Setup = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [credentials, setCredentials] = useState(null)

  const createAdmin = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:4000/api/setup/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setCredentials(data.credentials)
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.error('Setup error:', error)
      setError('Failed to create admin user. Make sure the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <UserPlus className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Initial Setup</h2>
                <p className="text-gray-600 mt-2">Create your admin account to get started</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Info Box */}
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-800 mb-2">
                  This will create a default admin account with the following credentials:
                </p>
                <div className="text-xs text-purple-700 space-y-1">
                  <p><strong>Email:</strong> admin@patkarsrealty.com</p>
                  <p><strong>Password:</strong> admin123</p>
                </div>
                <p className="text-xs text-purple-600 mt-2">
                  ⚠️ Please change the password after first login
                </p>
              </div>

              {/* Create Button */}
              <button
                onClick={createAdmin}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Success!</h2>
                <p className="text-gray-600 mb-6">Admin account created successfully</p>

                {/* Credentials Display */}
                {credentials && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                    <p className="text-sm font-medium text-green-800 mb-2">Your Login Credentials:</p>
                    <div className="space-y-1">
                      <p className="text-sm text-green-700">
                        <strong>Email:</strong> {credentials.email}
                      </p>
                      <p className="text-sm text-green-700">
                        <strong>Password:</strong> {credentials.password}
                      </p>
                    </div>
                    <p className="text-xs text-green-600 mt-3">
                      💡 Save these credentials in a secure place
                    </p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                >
                  Go to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Setup

