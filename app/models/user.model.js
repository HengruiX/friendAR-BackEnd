const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    bio: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    links: [{
        facebook: String,
        linkedin: String
    }],
    pics: [{type: String}]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);