const mongoose = require('mongoose')

module.exports.connect = (url) => {
  mongoose.connect((url || process.env.DATABASE_URL), { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error: '))
  db.once('open', () => {
    console.log('Database Connected!')
  })
}
