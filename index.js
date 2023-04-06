const express = require('express');
const app = express();
const connectDB  = require('./database/connection');
const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors');
app.use(express.json());

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   optionsSuccessStatus: 200
// }

app.use(cors());

//load assets
app.use('/', require('./routes/router'));

//calling database
connectDB();

app.listen(process.env.PORT, () => {
  console.log("server running....");
});
