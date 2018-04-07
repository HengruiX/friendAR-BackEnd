const User = require('../models/user.model.js');

exports.getInfo = (req, res) => {
    var name = req.query.name;
    var selfname = req.query.selfname
    console.log("querying " + name)
    User.findOne({name:name}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            isFriend = result.friends.includes(selfname) ? true : false
            res.json();
        }
    });
};

exports.getMutualFriends = (req, res) => {

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
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    User.findOne({"name": req.body.requester},"friends",function(err,user){
        if (err) return handleError(err);
        user.friends.push(req.body.requested);
        user.save(function(err){
            if (err){
                console.log(err);
            } else {
                res.json({status:0});
            }
        });
    });

    User.findOne({"name": req.body.requested},"friends",function(err,user){
        if (err) return handleError(err);
        user.friends.push(req.body.requester);
        user.save(function(err){
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

exports.addPics = (req, res) => {
    pics = 
}