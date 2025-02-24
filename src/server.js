const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
app.use(cors())
app.use(express.json())
const port = process.env.PORT_NUMBER || 3000

app.listen(port,()=>{
      console.log(`http://localhost:${port}`)
})