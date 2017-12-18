'use strict'
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler {
    /**
     * Returns error formatted by youch
     *
     * @method _getYouchError
     * @async
     *
     * @param  {Object}       error  - The error object
     * @param  {Object}       req    - Current request object
     * @param  {Boolean}      isJSON - Does response has to be in JSON
     *
     * @return {Html|Object}
     *
     * @private
     */
    _getYouchError(error, req, isJSON)
    {
        const Youch = require('youch')
        const youch = new Youch(error, req)
        if(isJSON)
        {
            return youch.toJSON()
        }
        return youch.toHTML()
    }

    /**
     * Returns view error to be used when running
     * server in production. Since production
     * server should not show error stack.
     *
     * @method _getViewError
     *
     * @param  {Object}       error  - The error object
     * @param  {Boolean}      isJSON - Does response has to be in JSON
     *
     * @return {Object}
     *
     * @private
     */
    _getViewError(error, view, isJSON)
    {
        let viewFile = 'default';
        if(error.status === 403 || error.status === 404 || error.status === 500)
        {
            viewFile = error.status;
        }
        return isJSON ? {
            message: error.message,
            name:    error.name,
            code:    error.code,
            status:  error.status
        } : view.render('_errors.' + viewFile, {
            status:  error.status,
            message: error.message
        })
    }

    /**
     * Handle exception thrown during the HTTP lifecycle
     *
     * @method handle
     *
     * @param  {Object} error
     * @param  {Object} options.request
     * @param  {Object} options.response
     *
     * @return {void}
     */
    async handle(error, {request, response, view})
    {
        const isJSON = request.accepts(['html', 'json']) === 'json';
        if(process.env.NODE_ENV === 'development')
        {
            const formattedError = await this._getYouchError(error, request.request, isJSON);
            response.status(error.status).send(formattedError);
            return
        }
        response.status(error.status).send(this._getViewError(error, view, isJSON));
    }

    /**
     * Report exception for logging or debugging.
     *
     * @method report
     *
     * @param  {Object} error
     * @param  {Object} options.request
     *
     * @return {void}
     */
    async report(error, {request})
    {
    }
}
module.exports = ExceptionHandler
