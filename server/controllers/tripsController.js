
module.exports = {

    getTripDiscussion: async (req, res) => {

        try {
            let db = req.app.get('db')
            //let { trip_id } = req.params
            let trip_id = 1

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
            let { message } = req.body
            let user_id = req.session.user.id 
            let trip_id = 1

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
            return res.send(trips)
        } catch(error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

}