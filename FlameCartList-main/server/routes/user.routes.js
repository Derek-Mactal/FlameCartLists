const UserController = require('../controllers/user.controller'); 
module.exports = app => {
    // app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/logout', UserController.LogOutUser);
    app.get('/api/users/auth', UserController.auth);
    // app.get('/api/users/:id', UserController.findOneSingleUser);
    // app.put('/api/users/:id', UserController.updateExistingUser);
    app.post('/api/users', UserController.createNewUser);
    app.post('/api/users/login', UserController.LoginUser);
    // app.delete('/api/users/:id', UserController.deleteAnExistingUser);
}