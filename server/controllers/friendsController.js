module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const db = req.app.get('db')
            let id = req.session.user.id
            let allUsers = await db.get_all_users(id)
            res.send(allUsers)
            
        } catch (error) {
            console.log('error getting users', error)
            res.status(500).send(error)
        }
    },
    
    getProfile: async (req, res) => {
        try {
            const db = req.app.get('db')
            let id = +req.params.id
            let profileResponse = await db.get_user_profile(id)
            res.send(profileResponse[0])
        } catch (error) {
            console.log('error getting user profile', error)
            res.status(500).send(error)
        }
    },

    getFriends: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {id} = req.session.user
            let friends = await db.get_friends(id)
            res.send(friends);

        } catch (error) {
            console.log('error getting friends', error)
            res.status(500).send(error)
        }
    }, 

    addFriends: async (req, res) => {
        try {
            const db = req.app.get('db')
            let user_id = req.session.user.id
            let {friend_id} = req.body
            console.log(friend_id)
            console.log(req.body)
            let newFriend = await db.add_friends([friend_id, user_id])
            res.send(newFriend)

        } catch (error) {
            console.log('error adding friends', error)
            res.status(500).send(error)
        }    
    }, 

    deleteFriends: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {id} = req.params
            let user_id = req.session.user.id

            let remove = await db.delete_friends([id, user_id])
            res.send(remove)
            
        } catch (error) {
            console.log('error deleting friend', error)
            res.status(500).send(error)
        }       
    }

}