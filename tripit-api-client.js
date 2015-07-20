var OAuth = require("oauth").OAuth,
	Q = require("q");

function TripitApiClient(consumerKey, consumerSecret) {
	this.oauth = new OAuth(
		"https://api.tripit.com/oauth/request_token",
		"https://api.tripit.com/oauth/access_token",
		consumerKey,
		consumerSecret,
		"1.0",
		null,
		"HMAC-SHA1"
	);
}

TripitApiClient.prototype = {
	getRequestToken: function () {
		var deferred = Q.defer();
		this.oauth.getOAuthRequestToken(deferred.makeNodeResolver());
		return deferred.promise;
	},

	getAccessToken: function (requestToken, requestTokenSecret, verifier) {
		var deferred = Q.defer();
		this.oauth.getOAuthAccessToken(requestToken, requestTokenSecret, verifier, deferred.makeNodeResolver());
		return deferred.promise;
	},

	requestResource: function (path, method, accessToken, accessTokenSecret) {
		var url = "https://api.tripit.com/v1" + path + "/format/json";
		var deferred = Q.defer();
		this.oauth.getProtectedResource(url, method, accessToken, accessTokenSecret, deferred.makeNodeResolver());
		return deferred.promise;
	}
};

module.exports = TripitApiClient;