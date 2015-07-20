var express = require("express"),
	app = express();

var TripitApiClient = require("tripit-node"),
	client = new TripitApiClient("YOUR_CONSUMER_KEY", "YOUR_CONSUMER_SECRET");

var requestTokenSecrets = {};

app.get("/authorize", function (req, res) {
	client.getRequestToken().then(function (results) {
		var token = results[0],
			secret = results[1];
		requestTokenSecrets[token] = secret;
		res.redirect("https://www.tripit.com/oauth/authorize?oauth_token=" + token);
	}, function (error) {
		res.send(error);
	});
});

app.get("YOUR_CALLBACK_URL", function (req, res) {
	var token = req.query.oauth_token,
		secret = requestTokenSecrets[token],
		verifier = req.query.oauth_verifier;
	client.getAccessToken(token, secret, verifier).then(function (results) {
		var accessToken = results[0],
			accessTokenSecret = results[1];
		return client.requestResource("/get/profile", "GET", accessToken, accessTokenSecret).then(function (results) {
			var response = results[0];
			res.send(response);
		});
	}, function (error) {
		res.send(error);
	});
});

app.listen(1024);
