require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const ac = require('./controllers/authController');
const tc = require('./controllers/tripsController');
const fc = require('./controllers/friendsController')
const checkForSession = require('./middleware/checkForSession');
const app = express();

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env

app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log('Database is connected')
});

// Authorization Endpoints
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)
app.get('/auth/currentuser', ac.currentUser)

app.use(checkForSession)
// Trips Endpoints
app.get('/trip/discussion/:trip_id', tc.getTripDiscussion)
app.get('/dashboard/trips', tc.getLoggedInUsersTrips)
app.get('/trip/discussionauthor/:userid', tc.getDiscussionAuthor)
app.put('/trip/discussion/:id', tc.updateDiscussion)
app.delete('/trip/discussion/:id', tc.deleteMessage)
app.post('/trip/discussion', tc.createMessage)
app.get('/trip/:id', tc.getTrips)
app.post('/trip/create', tc.createTrip)
app.get('/userprofile/trips/:user_id', tc.getUserProfileTrips)
app.post('/trip/members', tc.addMember)
app.get('/trip/members/:trip_id', tc.getTripMembers)
app.get('/trip/addmembers/:trip_id', tc.getMembersToAdd)
app.delete('/trip/member/:user_id/:trip_id', tc.deleteMember)
app.post('/trip/housing', tc.addHousingToTrip)
app.get('/trip/housing/:trip_id', tc.getTripHousing)

// Friends endpoints
app.get('/friends/get', fc.getFriends)
app.get('/profile/:id', fc.getProfile)
app.post('/friends/add', fc.addFriends)
app.delete('/friends/delete/:id', fc.deleteFriends)
app.get('/friends/users', fc.getAllUsers)
app.get('/users/getfriends/:id', fc.getUsersFriends)
app.put('/friends/img', fc.changeImage)


app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
});
