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
    console.log(req.body)
    if(!req.body.facebook) {
        fb = "Not Set";
    } else {
        fb = req.body.facebook;
    }

    if(!req.body.linkedin) {
        li = "Not Set";
    } else {
        li = req.body.linkedin;
    }

    const user = new User({
        name: req.body.name,
        bio: req.body.bio,
        facebook: fb,
        linkedin: li
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
    if(!req.query) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    User.findOne({"name": req.query.requester},"friends",function(err,requester){
        if (err) return handleError(err);
        requester.friends.push(req.query.requested);
        requester.save(function(err){
            if (err){
                console.log(err);
            } else {
                
            }
        });
    });

    User.findOne({"name": req.query.requested},"friends",function(err,requested){
        if (err) return handleError(err);
        requested.friends.push(req.query.requester);
        requested.save(function(err){
            if (err){
                console.log(err);
            } else {
                res.json({status:0});
            }
        });
    });

};

exports.delete = (req, res) => {
    
};