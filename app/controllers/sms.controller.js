const User = require('../models/user.model.js');

// Twilio Credentials
const accountSid = '<SID>';
const authToken = '<TOKEN>';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

exports.textUser = async (req, res) => {
    var textContent = req.body.text;
    var name = req.body.name;

    console.log("texting " + name);

    result = await User.findOne({name:name});
    phone = result.phone

    client.messages.create(
        {
          to: phone,
          from: '+12017304711',
          body: textContent,
        },
        (err, message) => {
            res.json({
                status: 0
            });
        }
      );
};
