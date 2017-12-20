'use strict'
const User = use('App/Models/User');
class UserUpdate {
    get messages()
    {
        return {
            required: '{{field}} is required.'
        }
    }

    get rules()
    {
        const userId = this.ctx.params.id;
        return {
            username: 'required|unique:users,username,id,$(userId)',
            email:    'required|email|unique:users,email,id,$(userId)',
            password: 'confirmed',
        }
    }
}
module.exports = UserUpdate
