const User = require('../models/user.model.js');

exports.getInfo = (req, res) => {

};

exports.getMutualFriends = (req, res) => {

};

exports.isFriend = (req, res) => {

};

exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    const user = new User({
        name: req.body.name,
        bio: req.body.bio
    })

    user.save()
    return res.status(200).send({
        message: "Saved"
    });
};

exports.befriend = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    User.findOne({"name": req.body.requester},"friends",function(err,user){
        if (err) return handleError(err);
        person.friends.push(req.body.requested)
    })

};

exports.delete = (req, res) => {
    
};