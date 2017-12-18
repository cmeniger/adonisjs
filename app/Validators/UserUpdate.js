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
        const user = await User.find(params.id);

        console.log(user.toJSON());

        return {
            username: 'required|unique:users,username,id,$(userId)',
            email:    'required|email|unique:users,email,id,$(userId)',
            password: 'required',
        }
    }
}
module.exports = UserUpdate
