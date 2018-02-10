//MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//CONSTANTS
const PORT = process.env.PORT || 3000;

//APPLICATIONS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




app.get('/', (req, res) => {
  res.send('smoooooke')
})











app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`)
})