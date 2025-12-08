// Quick test script to verify backend
const testBackend = async () => {
  try {
    console.log('Testing backend connection...')
    
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:5000/api/health')
    const healthData = await healthResponse.json()
    console.log('✅ Health check:', healthData)
    
    // Test register endpoint
    const testUser = {
      fullName: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'test123456',
      phone: '1234567890'
    }
    
    console.log('\nTesting registration with:', testUser)
    
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    })
    
    const registerData = await registerResponse.json()
    console.log('Register response:', registerData)
    
    if (registerData.success) {
      console.log('✅ Registration successful!')
      console.log('Token:', registerData.data.token.substring(0, 20) + '...')
    } else {
      console.log('❌ Registration failed:', registerData.message)
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testBackend()
