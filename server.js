const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const openaiRoutes = require('./routes/openaiRoutes');
const errorHandler = require('./middlewares/errorMiddleware');


dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(errorHandler);


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/openai',openaiRoutes);



app.listen(process.env.PORT,() => {
  console.log("Server listening on port " + process.env.PORT);
});