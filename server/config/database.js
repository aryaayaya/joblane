const mongoose = require('mongoose')

const databaseConnection = async () => {
  const dbUrl = process.env.DB || process.env.MONGODB_URI
  if (!dbUrl) {
    throw new Error('Missing database connection string. Add DB or MONGODB_URI to server/config/config.env')
  }

  const data = await mongoose.connect(dbUrl)
  console.log(`database connected successfully at server ${data.connection.host}`)
}

module.exports = databaseConnection