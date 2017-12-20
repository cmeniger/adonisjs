'use strict'
const User = use('App/Models/User');
const Hash = use('Hash');
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

    async update({request, response, session, params})
    {
        // persist to database
        const user = await User.findOrFail(params.id);
        user.username = request.input('username');
        user.email = request.input('email');
        if(request.input('password'))
        {
            user.password = request.input('password');
        }
        await user.save();
        // Fash success message to session
        session.flash({notification: 'User updated!'});
        return response.redirect('back');
    }

    async destroy({request, response, session, params})
    {
        const user = await User.findOrFail(params.id);
        await user.delete();
        // Fash success message to session
        session.flash({notification: 'User deleted!'});
        return response.redirect('back');
    }
}
module.exports = UserController
