'use strict'
class UserStore {
    get messages()
    {
        return {
            required: '{{field}} is required.'
        }
    }

    get rules()
    {
        return {
            username: 'required|unique:users,username',
            email:    'required|email|unique:users,email',
            password: 'required|confirmed'
        }
    }
}
module.exports = UserStore
