const{
    getAllusersHandler,
    updateUserHandler,
    addUserHandler,
    deleteUserHandler
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/hapi/users',
        handler: addUserHandler,
    },
    {
        method: 'GET',
        path: '/hapi/users',
        handler: getAllusersHandler,
    },
    {
        method: 'PUT',
        path: '/hapi/users/{id}',
        handler: updateUserHandler,
    },
    {
        method: 'DELETE',
        path: '/hapi/users/{id}',
        handler: deleteUserHandler,
    }
]

module.exports = routes;

