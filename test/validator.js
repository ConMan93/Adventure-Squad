module.exports = {

    usernameValidator(username) {
        if (username.length < 4) {
            return true 
        } else {
            return false
        }
    },

    emailValidator(email) {
        if (!email.includes('@') || !email.includes('.')) {
            return true
        } else {
            return false
        }
    },

    passwordValidator(password) {
        if (password.length < 5) {
            return true
        } else {
            return false
        }
    },

    confirmPasswordValidator(password, confirmPassword) {
        if (confirmPassword !== password) {
            return true 
        } else {
            return false
        }
    }

}