'use strict'
const User = use('App/Models/User');
class UserController {
    async index({view})
    {
        const users = await User.all();
        return view.render('user.index', {users: users.toJSON()});
    }

    async create({view})
    {
        return view.render('user.create');
    }

    async store({request, response, session})
    {
        // persist to database
        const user = new User();
        user.username = request.input('username');
        user.email = request.input('email');
        user.password = request.input('password');
        await user.save();
        // Fash success message to session
        session.flash({notification: 'User added!'});
        return response.redirect('back');
    }

    async show({params, view})
    {
        const user = await User.findOrFail(params.id);
        return view.render('user.show', {user: user.toJSON()});
    }

    async edit({params, view})
    {
        const user = await User.findOrFail(params.id);
        return view.render('user.edit', {user: user.toJSON()});
    }
}
module.exports = UserController
