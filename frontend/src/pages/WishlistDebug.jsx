import { useState } from 'react'

const WishlistDebug = () => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testWishlistAPI = async () => {
    setLoading(true)
    const token = localStorage.getItem('token')
    
    try {
      console.log('Token:', token ? 'Present' : 'Missing')
      
      const response = await fetch('http://localhost:4000/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      
      setResult({
        status: response.status,
        data: data,
        token: token ? 'Present (length: ' + token.length + ')' : 'Missing'
      })
      
      console.log('Full response:', {
        status: response.status,
        data: data
      })
    } catch (error) {
      setResult({
        error: error.message
      })
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const testAddToWishlist = async () => {
    setLoading(true)
    const token = localStorage.getItem('token')
    
    // Use a dummy property ID for testing
    const testPropertyId = '507f1f77bcf86cd799439011'
    
    try {
      const response = await fetch(`http://localhost:4000/api/wishlist/toggle/${testPropertyId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      setResult({
        status: response.status,
        data: data,
        propertyId: testPropertyId
      })
      
      console.log('Add to wishlist response:', {
        status: response.status,
        data: data
      })
    } catch (error) {
      setResult({
        error: error.message
      })
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Wishlist Debug Tool</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Wishlist API</h2>
          
          <div className="space-y-4">
            <button
              onClick={testWishlistAPI}
              disabled={loading}
              className="px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-900 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Get Wishlist'}
            </button>
            
            <button
              onClick={testAddToWishlist}
              disabled={loading}
              className="ml-4 px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-900 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Add to Wishlist'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Make sure you're logged in</li>
            <li>Open browser console (F12)</li>
            <li>Click "Test Get Wishlist" to see what the API returns</li>
            <li>Click "Test Add to Wishlist" to test adding a property</li>
            <li>Check the console for detailed logs</li>
            <li>Check the result box below for the API response</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default WishlistDebug

