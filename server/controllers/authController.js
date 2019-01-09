const bcrypt = require('bcryptjs');

module.exports = {

    login: async (req, res) => {

        try {
            let db = req.app.get('db');
            let { email, password } = req.body;
            email = email.toLowerCase();

            let userResponse = await db.get_user_by_email(email)
            let user = userResponse[0]

            if (!user) {
                return res.status(401).send('Email not found')
            }

            let isAuthenticated = bcrypt.compareSync(password, user.password)
            if (!isAuthenticated) {
                return res.status(403).send('Incorrect password')
            }

            delete user.password
            req.session.user = user
            return res.send(user)
        } catch(error) {
            console.log(error)
            return res.status(500).send(error)
        }

    },

    register: async (req, res) => {

        try {
            let db = req.app.get('db');
            let { username, email, password, confirmPassword, venmo, profile_img } = req.body;
            email = email.toLowerCase();

            if (username.length < 4) {
                return res.status(409).send('Username must be 4 or more characters long')
            }

            if (!email.includes('@') || !email.includes('.')) {
                return res.status(409).send('Email must be in format "youremail@email.com/net/etc.')
            }

            if (password.length < 5) {
                return res.status(409).send('Password must be at least 5 characters long')
            }

            if (confirmPassword !== password) {
                return res.status(409).send('Passwords must match')
            }

            let userResponse = await db.get_user_by_email(email)
            if (userResponse[0]) {
                return res.status(409).send('Email already taken')
            }

            const salt = bcrypt.genSaltSync(10)
            password = bcrypt.hashSync(password, salt)

            let response = await db.register_user({username, password, email, venmo, profile_img})
            let newUser = response[0]

            delete newUser.password

            req.session.user = newUser
            res.send(newUser)
        } catch(error) {
            console.log(error)
            return res.status(500).send(error)
        }
    },

    logout: async (req, res) => {

        req.session.destroy()
        return res.sendStatus(200)

    },

    currentUser: async (req, res) => {

        res.send(req.session.user)
        
    }
}