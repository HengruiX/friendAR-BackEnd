module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Get info of user by name
    app.get('/user_info', users.getInfo);

    // Get the mutual friends
    app.get('/mutual_friends', users.getMutualFriends);

    // Create a user
    app.post('/create', users.create);

    // Become friends
    app.get('/befriend', users.befriend);

    // Delete a user
    app.post('/delete', users.delete);

    // Add pics to the user
    app.post('/add_pics', users.addPics);
}