
module.exports = {

    getTripDiscussion: async (req, res) => {

        try {
            let db = req.app.get('db')
            let trip_id  = +req.params.trip_id

            let tripDiscussion = await db.get_trip_discussion(trip_id)
            res.status(200).send(tripDiscussion)
        } catch(error) {
            console.log(error)
        }
    },

    getDiscussionAuthor: async (req, res) => {

        try {
            let db = req.app.get('db')
            let { userid } = req.params

            let discussionAuthor = await db.get_discussion_author(Number(userid))
            res.status(200).send(discussionAuthor[0])
        } catch(error) {
            console.log(error)
            res.status(500).send(error)
        }

    },

    updateDiscussion: async (req, res) => {

        try {
            let db = req.app.get('db')
            let { message } = req.body
            let id = +req.params.id


            let updatedMessage = await db.update_discussion({id, message})
            
            let newMessage = updatedMessage[0]

            return res.status(200).send(newMessage)

        } catch(error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    deleteMessage: async (req, res) => {

        try {

            let db = req.app.get('db')
            let id = +req.params.id

            let newDiscussion = await db.delete_discussion_message(id)
            return res.send(newDiscussion)

        } catch(error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    createMessage: async (req, res) => {

        try {
            let db = req.app.get('db')
            let { message, trip_id } = req.body
            let user_id = req.session.user.id 

            await db.create_new_message({user_id, trip_id, message})
            let tripDiscussion = await db.get_trip_discussion(trip_id)
            return res.send(tripDiscussion)

        } catch(error) {
            console.log(error)
            return res.status(500).send(error)
        }
    },

    getTrips: async (req, res) => {

        try {
            let db = req.app.get('db')
            let id = +req.params.id

            let trips = await db.get_trip(id)
            return res.status(200).send(trips)
        } catch(error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    createTrip: async (req, res) => {

        try {
            const db = req.app.get('db')
            let user_id = req.session.user.id
            let { originCity, originState, destinationCity, destinationState, to, from } = req.body
            console.log(req.body)

            let newTrip = await db.create_trip([originState, originCity, destinationState, destinationCity, from, to])
            console.log(newTrip)
            let createdTrip = newTrip[0]
            let trip_id = createdTrip.id

            await db.create_trips_users({user_id, trip_id})

            return res.send(createdTrip)

        } catch(error) {
            console.log(error)
            return res.status(500).send(error)
        }
    },

    getLoggedInUsersTrips: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { id } = req.session.user

            let usersTrips = await db.get_users_trips(id)
            return res.send(usersTrips)
            
        } catch(error) {
            console.log(error)
            return res.status(500).send(error)
        }
    },

    getUserProfileTrips: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { user_id } = req.params

            let tripsResponse = await db.get_userprofile_trips(user_id)
            return res.send(tripsResponse)
        } catch(error) {
            return res.status(500).send(error)
        }
    }
}