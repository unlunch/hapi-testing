const{
    getAllusersHandler,
    updateUserHandler,
    addUserHandler,
    deleteUserHandler
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/users',
        handler: addUserHandler,
    },
    {
        method: 'GET',
        path: '/users',
        handler: getAllusersHandler,
    },
    {
        method: 'PATCH',
        path: '/users/{id}',
        handler: updateUserHandler,
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: deleteUserHandler,
    }
]

module.exports = routes;

