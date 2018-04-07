const User = require('../models/user.model.js');

exports.getInfo = (req, res) => {
    var name = req.params.name;
    User.findOne({name:name}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
};

exports.getMutualFriends = (req, res) => {

};

exports.isFriend = (req, res) => {
    var name = req.params.name1;
    User.findOne({name:name}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
};

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    const user = new User({
        name: req.body.name,
        bio: req.body.bio
    });
    user.save(function(err){
        if (err){
            console.log(err);
        } else {
            res.json({status:0});
        }
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