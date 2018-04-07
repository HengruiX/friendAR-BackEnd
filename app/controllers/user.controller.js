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
};

exports.befriend = (req, res) => {

};

exports.delete = (req, res) => {
    
};