Arkane Connect
===

# Integrating Arkane Connect in your application

To integrate Arkane Connect in your web application, first of all you will need to [create a new ArkaneConnect instance](#Constructor). Secondly you will need to provide the 
instance with a way to authenticate. For this there are two options:
1) You use the authentication provider backed into Arkane
2) You initialize Arkane Connect providing it with your own bearer token provider


## Constructor
```javascript
new ArkaneConnect(<clientID>, <chains>[, <environment>]);
```

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| clientID | true | The clientID (case sensitive)| `'Arkane'`|
| chains | false | An array containing the chains for which a wallet is mandatory (for now, only one mandatory chain is supported)| `['Ethereum', 'VeChain']`|
| environment | false (default = `'prod'`) | The environment to which you want to connect, possible values are `'local'`, `'tst1'`, `'staging'`, `'prod'`. When omitted, `'prod'` will be used | `'local'` |

e.g.
```javascript
// production + no mandatory wallets
new ArkaneConnect('Arkane');

// production + mandatory Ethereum wallet
new ArkaneConnect('Arkane', ['Ethereum']);

// staging + mandatory Ethereum and VeChain wallet
new ArkaneConnect('Arkane', ['Ethereum', 'VeChain'], 'staging');
```


## Authentication using Arkane Connect
Following methods allow you to do and manage authentication with Arkane Connect

### Check if a user is authenticated
```javascript
arkaneConnect.checkAuthenticated();
```
(returns a `Promise<AuthenticationResult>`)

This will redirect the current page to our authentication provider. There it will check if the user is already authenticated and then redirect back to the current page with 
an authentication token. This will contain a bearer + refresh token if authenticated, or will be empty nothing if not authenticated.


### Authenticate a user
```javascript
arkaneConnect.authenticate();
```
(returns a `Promise<AuthenticationResult>`)

This will redirect the current page to our authentication provider. There it will check if the user is already authenticated and if not it will show a login page. After the user 
enters his credentials, he will be redirected back to the current page with an authentication token containing a bearer + refresh token.


#### AuthenticationResult
```javascript
{
    authenticated: (auth) => {};
    notAuthenticated: (auth) => {};
}
```
AuthenticationResult contains two functions `authenticated` and `notAuthenticated` which you can supply with callback functions to handle both situations.

e.g.
```javascript
arkaneConnect.checkAuthenticated()
             .then((result) => result.authenticated((auth) => {
                                        console.log('Authentication successfull ' + auth.subject);
                                     })
                                     .notAuthenticated((auth) => {
                                        console.log('Not authenticated');
                                     })
             );
```    

### Log a user out
```javascript
arkaneConnect.logout();
```
(returns `void`)

### Receive a callback when the bearer token refreshes
```javascript
arkaneConnect.addOnTokenRefreshCallback(bearerToken => {<process the token>});
```   
A callback function needs to be provided. This function needs to have one parameter (the new bearer token) and should return `void`

e.g.
```javascript
arkaneConnect.addOnTokenRefreshCallback(bearerToken => {
    console.log('The bearer token has been refreshed: ' + bearerToken);
});
```

## Init
You can also implement all the authentication handling yourself. What you then need to do is provide Arkane Connect with your own bearer token provider. 
This can be done through the `init` method.
 
```javascript
arkaneConnect.init(<bearerTokenProvider>);
``` 
(returns a `Promise<void>`) 

| Parameter | Description | Example |
|-----------|-------------|---------|
| bearerTokenProvider | A function returning the bearer token to login to Arkane | `() => auth.token`|

This call makes sure that the user has an Arkane master pincode and at least one wallet necessary for the third party app.
 
## Full integration example
Below you can find a full example of how setting up Arkane Connect might look like. We also made an [example project](https://github.com/ArkaneNetwork/Arketype) as a more 
complete example. 
```javascript
let authenticated = false;
const arkaneConnect = new ArkaneConnect('Arkane', 'ethereum');
arkaneConnect.checkAuthenticated()
             .then((result) => result.authenticated((auth) => { authenticated = true })
                                     .notAuthenticated((auth) => { authenticated = false }));
if (!authenticated) {
    arkaneConnect.authenticate();
}
```
# Using Arkane Connect
##Get Wallets

```javascript
arkaneConnect.getWallets().then(function(result) {
    console.log(result);
})
```

## Signing Transactions
```javascript
arkaneConnect.signTransaction(<TransactionRequest>).then(function(result) {
                                                    console.log(result);
                                                }).catch(function(error) {
                                                    console.log(error);
                                                });;
``` 

### (Optional) initialize popup
If the popup blocker of the browser is triggered (this might happen if you call a different api before calling the 'signTransaction'), please call the 'initializeTransaction' first.
This will open the popup for the signature already and redirect the popup to the correct page when signature is needed.

 
```javascript
arkaneConnect.initPopup();

//custom logic

arkaneConnect.signTransaction(<TransactionRequest>);
```

### Signing a Ethereum Transaction


```javascript
arkaneConnect.signTransaction({
    type: 'ETHEREUM_TRANSACTION',
    walletId: '44',
    submit: false,
    gasPrice: 10000000000,
    gas: 23000,
    nonce: 0,
    value: 10000000000,
    data: '0x',
    to: '0xdc71b72db51e227e65a45004ab2798d31e8934c9'
});
```

### Signing a VeChain Transaction

```javascript
arkaneConnect.signTransaction({
    type: 'VECHAIN_TRANSACTION',
    walletId: '44',
    submit: false,
    blockRef : "0x1",
    chainTag : "0x2",
    expiration : 10,
    gas: 23000,
    gasPriceCoef : 0,
    nonce: 0,
    clauses: [{
        to: '0xdc71b72db51e227e65a45004ab2798d31e8934c9',
        amount : "10000",
        data: '0x0',
    }]
});
```
