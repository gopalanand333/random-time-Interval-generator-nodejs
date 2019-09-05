const bodyParser = require("body-parser");
const querystring = require("querystring");
const request = require("request");
const dotenv = require("dotenv");  // dotenv is used for local enviornment vars
dotenv.config(); 
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}));
/*
    the get token gets the token for first time and store it in _oauthToken
    after that refreshToken is called in every 14 mins to refresh the token.
    840000 milli seconds = 14 mins
*/
(function () {
    getToken().then((token) => {
        // if the oauth token is recieved
        console.log("token fetched");
        _oauthToken = token;
        _refresh_token = JSON.parse(_oauthToken).refresh_token;
    }).catch((error)=>{
        console.log("error"); // if the token fetching failed
    });
}());
setInterval(getRefreshToken,840000);
// this will generate the tokens
function getToken() {
    return new Promise(function (resolve, reject) {
        var form = {
            "grant_type": process.env.grant_type,
			"client_id": process.env.client_id,
			"scope": process.env.scope,
			"username": process.env.usermail,
			"password": process.env.password
        };
        var formData = querystring.stringify(form);
        console.log(formData);
        request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": process.env.Authorization
             },
            uri: process.env.authUrl,
            body: formData,
            method: "POST"
        }, function (e, d, b) {
            resolve(b);
        }, function (error) {
            reject(error);
        });
    });
}
/*
    getting and storing refresh token
    @params: refresh_token;
    @parmas: grant_type= refresh_token
*/
function getRefreshToken(){
        var form = {
            "grant_type": "refresh_token",
            "refresh_token": _refresh_token,
            "client_id": process.env.client_id
        };
        console.log(form);
        var formData = querystring.stringify(form);
    request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": process.env.Authorization
        },
        uri: process.env.authUrl,
        body: formData,
        method: "POST"
    }, function (e, d, token) {
        console.log("refresh token recieved", token);
        _oauthToken = token;
        _refresh_token = JSON.parse(_oauthToken).refresh_token;
    }, function (error) {
       console.log(error);
});
}

/**
 * 
 * @param {object} data  payload to be sent
 * @param {sting} endpoint  the property of endpoint/url of the endpoint where you want to post data
 */
function postDataToEndPoint(data,endpoint){

}

module.exports = {
    postDataToEndPoint
}

