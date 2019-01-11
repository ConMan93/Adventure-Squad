
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

    }

    

}