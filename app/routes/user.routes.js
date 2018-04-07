module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Get info of user by name
    app.get('/user_info', users.getInfo);

    // Get the mutual friends
    app.get('/mutual_friends', users.getMutualFriends);

    // Get whether is friend
    app.get('/is_friend', users.isFriend);

    // Create a user
    app.post('/create', users.create);

    // Become friends
    app.get('/befriend', users.befriend);

    // Delete a user
    app.post('/delete', users.delete);
}