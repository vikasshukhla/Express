const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members')

const app = express();


//init middleware
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//Homepage route
app.get('/', (req,res)=> 
    res.render('index', {
        title: 'Member App',
        members
    })
);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


 
// Routing manually every single file

// app.get('/', (req, res) => {
//     res.sendfile(path.join(__dirname, 'public', 'index.html'));
// });
 

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT= process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port', PORT));
