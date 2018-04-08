const User = require('../models/user.model.js');

var findUserByName = async (name) => {
    User.findOne({name:name}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            return result;
        }
    });
}

exports.getInfo = async (req, res) => {
    var requested = req.query.requested;
    var requester = req.query.requester;
    console.log("querying " + requested);

    result = await findUserByName(requested);
    isFriend = result.friends.includes(requester) ? true : false;
    res.json({
        status: 0,
        user: result,
        isFriend: isFriend
    });
};

exports.getMutualFriends = async (req, res) => {
    var requested = req.query.requested;
    var requester = req.query.requester;
    console.log("querying mutual friend " + requested)

    requestedResult = await findUserByName(requested);
    requesterResult = await findUserByName(requester);

    mutual = []
    requestedResult.friends.forEach(function(friend){
        if (requesterResult.friends.includes(friend)){
            mutual.push(friend)
        }
    });

    res.json({
        status: 0,
        mutual: mutual
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

exports.addPics = async (req, res) => {
    var name = req.body.name;
    var pics = req.body.pics;

    result = await findUserByName(name);
    result.pics = result.pics.concat(pics);
    result.save(function(err){
        if (err){
            console.log(err);
        } else {
            res.json({status:0});
        }
    });
}