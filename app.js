require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const User = mongoose.model('User', {
  name: String
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, async () => {
  console.log('connected to database');
});


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/add-user/:name', async (req, res) => {
  const {
    name
  } = req.params;

  try {
    await User.create({
      name
    });
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);

  }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))