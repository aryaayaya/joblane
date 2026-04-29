const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const configPaths = [
  path.join(__dirname, 'config', 'config.env'),
  path.join(__dirname, 'config', '.env'),
  path.join(__dirname, 'config', 'config.sample.env')
]

const loadedConfigPath = configPaths.find((configPath) => fs.existsSync(configPath))
if (loadedConfigPath) {
  dotenv.config({ path: loadedConfigPath })
  console.log(`Loaded environment from ${loadedConfigPath}`)
} else {
  console.warn('Warning: No environment file found. Create server/config/config.env with DB and cloudinary variables.')
}


const app = require('./app')
const databaseConnection = require('./config/database')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const port = process.env.PORT || 3000

databaseConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  })