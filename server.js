const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require ('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'pelic720',
      database : 'smartbrain'
    }
});

db.select("*").from('users').then(data => {
    console.log(data);
})

const app = express();


// entries is used to track scores
// joined is used to track the joined date

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', signin.handleSignIn(db, bcrypt))
// dependency injection ( injecting whatever dependencies needs, in this case is handleRegister)
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall())

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}')
})


/* 
/ --> res = this is working (root route) 
/signin --> POST = success/fail (signin route) posting user info // instead of get a passwords (will expose to the route which we dont want) , so it is a must, to post inside the body, which is in HTTPS
/register --> POST = user  (add the data to database) return a new user
/profile/:userId --> GET = user (para will be the user's ownID route)
/image --> PUT --> user  (whatever updated in the user)

*/
