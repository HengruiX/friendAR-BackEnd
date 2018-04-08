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
}
exports.delete = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // User.findOne({"name":req.query.name},function(err,test){
    //     console.log(test.name);
    // });
    User.findOne({"name":req.body.name},function(err,model){
        model.remove(function(err){});
    });

    User.find({},function(err,users){
        users.forEach(function(u){
            idx = u.friends.indexOf(req.body.name)
            if (idx != -1) {
                u.friends.splice(idx,1);
            }
            u.save()
        });
        res.json({status:0})
    });
};

exports.addPics = (req, res) => {
    
};