var express = require('express');
var router = express.Router();
var https = require('https');

require('dotenv').config();


/* GET home page. */
router.post('/', function (req, res, next) {
    console.log(req.body);

    let data = {
        members: [
            {
                email_address: req.body.email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: req.body.fullname
                }
            }
        ]
    };
    let jsonData = JSON.stringify(data);

    const url = 'https://us6.api.mailchimp.com/3.0/lists/'+process.env.LIST_ID;
    const options = {
        method: 'POST',
        auth: "cskouson1:"+process.env.CHIMP_KEY
    }
    //https request oject to send to mailchimp
    const request = https.request(url, options, (response) =>{
        
        if(response.statusCode === 200){
            res.set('Cache-control', 'no-store');
            res.sendFile('success.html', { root: '../MailingList/public/html/' });
        } else{
            res.set('Cache-control', 'no-store');
            res.sendFile('failure.html', { root: '../MailingList/public/html/' });
        }
        
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end(); //end of mailchimp comms

    //succ or fail
    //res.set('Cache-control', 'no-store');
    //res.send('success');
});

module.exports = router;
