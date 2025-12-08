// Simple backend diagnostic script
const path = require('path')
const fs = require('fs')

console.log('🔍 Backend Diagnostic Report')
console.log('============================')

// Check if backend directory exists
const backendPath = path.join(__dirname, 'backend')
console.log(`✅ Backend directory: ${fs.existsSync(backendPath) ? 'EXISTS' : 'MISSING'}`)

// Check critical files
const criticalFiles = [
  'backend/server.js',
  'backend/package.json',
  'backend/.env',
  'backend/models/User.js',
  'backend/controllers/authController.js',
  'backend/routes/auth.js',
  'backend/middleware/auth.js'
]

criticalFiles.forEach(file => {
  const exists = fs.existsSync(file)
  console.log(`${exists ? '✅' : '❌'} ${file}: ${exists ? 'EXISTS' : 'MISSING'}`)
})

// Check node_modules
const nodeModulesPath = path.join(backendPath, 'node_modules')
console.log(`✅ Backend node_modules: ${fs.existsSync(nodeModulesPath) ? 'EXISTS' : 'MISSING'}`)

// Check .env variables
if (fs.existsSync('backend/.env')) {
  const envContent = fs.readFileSync('backend/.env', 'utf8')
  console.log('\n📋 Environment Variables:')
  console.log(`✅ PORT: ${envContent.includes('PORT=') ? 'SET' : 'MISSING'}`)
  console.log(`✅ MONGODB_URI: ${envContent.includes('MONGODB_URI=') ? 'SET' : 'MISSING'}`)
  console.log(`✅ JWT_SECRET: ${envContent.includes('JWT_SECRET=') ? 'SET' : 'MISSING'}`)
}

console.log('\n🚀 Ready to start backend!')
console.log('Run: npm run backend')