const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:auth/auth', {useNewUrlParser: true, useCreateIndex: true});

app.use(morgan('combined'));
app.use(express.json);
app.use(express.urlencoded({extended: true}));
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const routes = require('./routes');

app.get('/', (req, res) => res.send(1))
app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));