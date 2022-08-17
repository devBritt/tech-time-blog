const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// handlebars
const hbs = require('express-handlebars').create({});

// create user session
const expsess = require('express-session');

// connect user session to db
const SequelizeStore = require('connect-session-sequelize')(expsess.Store);
const session = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

// init handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// create user session
app.use(expsess(session));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
// app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is now listening at port ${PORT} 🚀`))
});
