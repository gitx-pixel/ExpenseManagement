const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
const path = require('path');

dotenv.config();

const app = express();

connectDb();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function(req,res){res.sendFile(path.join(__dirname, './client/build/index.html'));});
app.use('/api/v1/users', require('./routes/userRoute'));
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {console.log(`Server Running on PORT ${PORT}`);});


