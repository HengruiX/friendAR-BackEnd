const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    bio: String,
    friends: [{ type: String }],
    facebook: { type: String, default: "not set" },
    linkedin: { type: String, default: "not set" },
    pics: [{type: String}]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);