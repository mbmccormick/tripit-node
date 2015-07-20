# Tripit-Node

An API client library written for Tripit in NodeJS.

## Usage
1. `npm install tripit-node`
1. (In your JS file) `var TripitApiClient = require("tripit-node");`

## API

#### `new TripitApiClient(consumerKey, consumerSecret)`
Constructor. Use the `consumerKey` and `consumerSecret` provided to you when you registered your app on [tripit.com](https://www.tripit.com/developer).

#### `getRequestToken()`
Get a request token. This is the first step of the OAuth flow. Returns a Q promise. When this promise is resolved with a request token, forward the user to the Tripit site (e.g., http://www.tripit.com/oauth/authorize?oauth_token=<requestToken>) for authentication. (You can substitute "authenticate" instead of "authorize" in the URL if you do not wish to forward to the Tripit site for authentication next time you request an access token.)

#### `getAccessToken(requestToken, requestTokenSecret, verifier)`
After the user authorizes with Tripit, he/she will be forwarded to the URL you specify in your Tripit API application settings, and the `requestToken` and `verifier` will be in the URL. Use these, along with the `requestTokenSecret` you received above to request an access token in order to make API calls. Returns a Q promise.

#### `requestResource(url, httpMethod, accessToken, accessTokenSecret, [userId])`
Make an API call to the Tripit servers. (See [example.js](https://github.com/mbmccormick/tripit-node/blob/master/example.js) for an example.) Returns a Q promise.