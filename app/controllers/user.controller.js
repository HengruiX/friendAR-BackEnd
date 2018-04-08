const User = require('../models/user.model.js');

exports.getInfo = async (req, res) => {
    var requested = req.query.requested;
    var requester = req.query.requester;
    console.log("querying " + requested);

    result = await User.findOne({name:requested});
    isFriend = result.friends.includes(requester) ? true : false;
    delete result.phone
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

    requestedResult = await User.findOne({name:requested});
    requesterResult = await User.findOne({name:requester});

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

    if(!req.body.phone) {
        phone = "";
    } else {
        phone = req.body.phone;
    }

    const user = new User({
        name: req.body.name,
        bio: req.body.bio,
        facebook: fb,
        linkedin: li,
        phone: phone
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

exports.addPics = async (req, res) => {
    var name = req.body.name;
    var pics = req.body.pics;

    result = await User.findOne({name:name});
    result.pics = result.pics.concat(pics);
    result.save(function(err){
        if (err){
            console.log(err);
        } else {
            res.json({status:0});
        }
    });
}

exports.test = async (req, res) => {
    console.log("test")
    res.json({status:0});
}
