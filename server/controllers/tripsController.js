
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
            let trip_id = + req.params.trip_id

            let newDiscussion = await db.delete_discussion_message({id, trip_id})
            return res.send(newDiscussion)

        } catch(error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    createMessage: async (req, res) => {

        try {
            let db = req.app.get('db')
            let { message, trip_id, date } = req.body
            let user_id = req.session.user.id 

            await db.create_new_message({user_id, trip_id, message, date})
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
            let newTrip = await db.create_trip([originState, originCity, destinationState, destinationCity, from, to])
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
    },

    addMember: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {user_id, trip_id} = req.body
            let memberResponse = await db.add_trip_members([user_id, trip_id])

            res.send(memberResponse)

        } catch (error) {
            console.log('error adding members', error)
            res.status(500).send(error)
        }
        
    },
    getTripMembers: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {trip_id} = req.params
            let tripMembers = await db.get_trip_members(trip_id)
            res.send(tripMembers)

        } catch (error) {
            console.log('error getting trip members', error)
            res.status(500).send(error)
        }
    }, 
    deleteMember: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {user_id, trip_id} = req.params
            let deleteResponse = await db.delete_member_from_trip([user_id, trip_id])
            res.send(deleteResponse)

        } catch (error) {
            console.log('error removing member', error)
            res.status(500).send(error)
        }
    }, 

    getMembersToAdd: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {trip_id} = req.params
            let tripMemberResponse = await db.get_friends_to_add(trip_id)
            res.send(tripMemberResponse)
        } catch (error) {
            console.log('error getting members', error)
            res.status(500).send(error)
        
        }
    },

    addHousingToTrip: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { trip_id, name, latitude, longitude, address, phone, daily_price } = req.body
            let currentHousing = await db.get_trip_housing(trip_id)
            if (currentHousing[0]) {
                let updatedHousing = await db.update_housing_info({trip_id, name, latitude, longitude, address, phone, daily_price})
                return res.send(updatedHousing[0])
            }
            let tripHousing = await db.add_housing_to_trip({trip_id, name, latitude, longitude, address, phone, daily_price})
            return res.send(tripHousing[0])
        } catch(error) {
            return res.status(500).send(error)
        }
    },

    getTripHousing: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { trip_id } = req.params
            let housingResponse = await db.get_trip_housing(trip_id)
            return res.send(housingResponse)
        } catch(error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }
}