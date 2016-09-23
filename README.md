# Cementify Express JS code
#Deploy to heroku
  - https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app
  - https://github.com/bmizerany/heroku-docs/blob/master/docs/renaming-apps.txt
  - http://cementify.herokuapp.com/ - development happening here
  - Created redis-lively-77028 as REDIS_URL
  - https://devcenter.heroku.com/articles/heroku-redis#connecting-in-node-js
  - https://devcenter.heroku.com/articles/custom-domains
  - http://stackoverflow.com/questions/7170664/how-to-configure-heroku-application-dns-to-godaddy-domain
  
## Purpose

**EXPRESS SET UP**

https://www.quora.com/What-are-the-biggest-websites-built-with-Node-js-on-the-server-side
 - To get it running  DEBUG=myapp:* npm start
 - After git clone - git remote add origin git@github.com:foo/bar.git
                     git push origin master
# Awesome chrome-devtools [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/rnjailamba/website)

1-Node.js was installed at

   /usr/local/bin/node

npm was installed at

   /usr/local/bin/npm

Make sure that /usr/local/bin is in your $PATH

2-Debugging

http://spin.atomicobject.com/2015/09/25/debug-node-js/

https://strongloop.com/strongblog/announcing-a-new-and-improved-node-js-debugger/

fixed it - http://stackoverflow.com/questions/23340968/debugging-node-js-with-node-inspector?rq=1

3-http://expressjs.com/starter/generator.html

4-  express.js without jade - [http://stackoverflow.com/questions/7520541/node-js-express-without-using-jade](http://stackoverflow.com/questions/7520541/node-js-express-without-using-jade)

For ejs and not jade 

express --ejs

5- DB integrations

-redis - http://redis.io/topics/quickstart

npm install redis --save

http://www.sitepoint.com/using-redis-node-js/

6- 
	npm install passport  
	npm install bootstrap
	https://scotch.io/tutorials/easy-node-authentication-setup-and-local

7 — 

npm install twilio

8 — jquery installed 

npm install —save query

[http://stackoverflow.com/questions/14264429/how-to-use-jquery-installed-with-npm-in-express-app](http://stackoverflow.com/questions/14264429/how-to-use-jquery-installed-with-npm-in-express-app)

9- bootstrap installed by npm and included

10 - npm install express-session

11 - npm install connect-flash

12 — npm install mongoose

npm install --save kerberos mongodb

13 — npm install fs

[https://docs.nodejitsu.com/articles/file-system/how-to-write-files-in-nodejs](https://docs.nodejitsu.com/articles/file-system/how-to-write-files-in-nodejs)

14 — npm install passport-local

y both passport and local needed

[http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619](http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619)

15 — npm install bcrypt-nodejs

for passwords

16 - don’t use cookie parser

[http://stackoverflow.com/questions/27961320/when-should-i-use-cookie-parser-with-express-session](http://stackoverflow.com/questions/27961320/when-should-i-use-cookie-parser-with-express-session)

17 - npm install express-jwt express-unless --save

for the jwt verification

18 ensure stuff is in design pattern and very synchronous 

19 — npm install node-uuid

20 — npm install redis

21 — module.exports [http://openmymind.net/2012/2/3/Node-Require-and-Exports/](http://openmymind.net/2012/2/3/Node-Require-and-Exports/)

[http://www.sitepoint.com/understanding-module-exports-exports-node-js/](http://www.sitepoint.com/understanding-module-exports-exports-node-js/)

22 sessionid vs connect.id -  [http://stackoverflow.com/questions/16919051/how-can-i-get-sessionid-from-a-request](http://stackoverflow.com/questions/16919051/how-can-i-get-sessionid-from-a-request)

23 — memory store [http://stackoverflow.com/questions/10760620/using-memorystore-in-production](http://stackoverflow.com/questions/10760620/using-memorystore-in-production)

24 — [https://smsowl.in/](https://smsowl.in/)

25 — npm install twilio

[https://www.twilio.com/blog/2013/03/introducing-the-twilio-module-for-node-js.html](https://www.twilio.com/blog/2013/03/introducing-the-twilio-module-for-node-js.html)

[https://www.twilio.com/user/account/messaging/dev-tools/api-explorer/message-create?expanded=0](https://www.twilio.com/user/account/messaging/dev-tools/api-explorer/message-create?expanded=0)

[https://twilio.github.io/twilio-node/](https://twilio.github.io/twilio-node/)

Bootstrap

Login system

express vs node 

[http://evanhahn.com/understanding-express/](http://evanhahn.com/understanding-express/)

MONGO 

[https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)

easy user auth

[https://scotch.io/tutorials/upgrading-our-easy-node-authentication-series-to-expressjs-4-0](https://scotch.io/tutorials/upgrading-our-easy-node-authentication-series-to-expressjs-4-0)

Design principles(controller etc)

[https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton#setup-mongoose-to-mongodb](https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton#setup-mongoose-to-mongodb)

grunt

[http://howtonode.org/simplifying-chores-with-grunt](http://howtonode.org/simplifying-chores-with-grunt)

deploy blog to heroic

[http://howtonode.org/deploy-blog-to-heroku](http://howtonode.org/deploy-blog-to-heroku)

url parmeters

[http://webapplog.com/url-parameters-and-routing-in-express-js/](http://webapplog.com/url-parameters-and-routing-in-express-js/)

passport session

[https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=express%20js%20passport%20session](https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=express%20js%20passport%20session)

write session locally and on box 

help in passport login signup and logout 

[http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619](http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619)

[https://github.com/tutsplus/passport-mongo](https://github.com/tutsplus/passport-mongo)

secondary resources

[http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VmDdDt8rLX_](http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VmDdDt8rLX_)

[https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/](https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/)

[https://scotch.io/tutorials/easy-node-authentication-setup-and-local](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)

security and cookie parser not needed

[https://github.com/expressjs/session#cookie-options](https://github.com/expressjs/session#cookie-options)

The order you place your middleware and routes is very important

[https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4](https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4)

*token generation and usage but not the saving of the token

[https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#set-up-our-node-application-(package-json)](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#set-up-our-node-application-(package-json))

[http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543](http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543)

cookie vs token 

[https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)

[https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/)

jwt for android

[https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=jwt%20with%20android](https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=jwt%20with%20android)

y jwt is needed for android

[http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543](http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543)

*3rd answer - token better than cookie

[http://stackoverflow.com/questions/1592534/what-is-token-based-authentication?rq=1](http://stackoverflow.com/questions/1592534/what-is-token-based-authentication?rq=1)

how cookie works

[http://www.yegor256.com/2015/05/18/cookie-based-authentication.html](http://www.yegor256.com/2015/05/18/cookie-based-authentication.html)

session vs token auth

[http://security.stackexchange.com/questions/81756/session-authentication-vs-token-authentication](http://security.stackexchange.com/questions/81756/session-authentication-vs-token-authentication)

*example of token

[http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543](http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543)

imp token info[they req local storage]

[https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/#token-storage](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/#token-storage)

*socket  io token

[https://auth0.com/blog/2014/01/15/auth-with-socket-io/](https://auth0.com/blog/2014/01/15/auth-with-socket-io/)

***clearest jwt intro**

In authentication, when the user successfully logs in using his credentials, a JSON Web Token will be returned and must be saved locally (typically in local storage, but cookies can be also used), instead of the traditional approach of creating a session in the server and returning a cookie.

https://auth0.com/learn/json-web-tokens

JWT

learn about jwt - [https://scotch.io/tutorials/the-anatomy-of-a-json-web-token](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)

session with cookies/redis - [http://blog.modulus.io/nodejs-and-express-sessions](http://blog.modulus.io/nodejs-and-express-sessions)

choose auth strategy - [https://stormpath.com/blog/choosing-nodejs-authentication-strategy/](https://stormpath.com/blog/choosing-nodejs-authentication-strategy/)

sessions pose a scalability prob - [https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication#introduction](https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication#introduction)

*full example

[http://blog.matoski.com/articles/jwt-express-node-mongoose/#how-we-used-auth](http://blog.matoski.com/articles/jwt-express-node-mongoose/#how-we-used-auth)

express-jwt 

[https://auth0.com/docs/server-apis/nodejs](https://auth0.com/docs/server-apis/nodejs)

manipulate jwt 

[http://www.dwmkerr.com/modifying-a-jwt-in-a-node-application/](http://www.dwmkerr.com/modifying-a-jwt-in-a-node-application/)

I think this login design has hack bug.Some one can intercept user's http request and get the token.So that the hacker can simulate a request to login.Right?

In the same way that someone can intercept a cookie. Use ssl

passport and jwt

[http://stackoverflow.com/questions/20228572/passport-local-with-node-jwt-simple](http://stackoverflow.com/questions/20228572/passport-local-with-node-jwt-simple)

just pseudo of jwt

[https://coderead.wordpress.com/2012/08/16/securing-node-js-restful-services-with-jwt-tokens/](https://coderead.wordpress.com/2012/08/16/securing-node-js-restful-services-with-jwt-tokens/)

MemoryStore is just for (rapid) development mode, because if your app restarts (process dies) you will lose all the session data (that resided in the memory of that process).

If you don't want to use a database, use encrypted cookie storage instead.

and memoryStore clean up

[http://stackoverflow.com/questions/10760620/using-memorystore-in-production](http://stackoverflow.com/questions/10760620/using-memorystore-in-production)

use redis instead of memoryStore on the box

[http://www.hacksparrow.com/use-redisstore-instead-of-memorystore-express-js-in-production.html](http://www.hacksparrow.com/use-redisstore-instead-of-memorystore-express-js-in-production.html)

[http://blog.modulus.io/nodejs-and-express-sessions](http://blog.modulus.io/nodejs-and-express-sessions)

**Warning** The default server-side session storage, MemoryStore, is _purposely_ not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

use cookie instead of memoryStore

[http://stackoverflow.com/questions/10966689/set-client-side-accessible-cookie-in-express](http://stackoverflow.com/questions/10966689/set-client-side-accessible-cookie-in-express)

secure node

[http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/](http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/)

for req.cookies

[https://github.com/expressjs/cookie-parser](https://github.com/expressjs/cookie-parser)

deep dive

[https://www.airpair.com/express/posts/expressjs-and-passportjs-sessions-deep-dive](https://www.airpair.com/express/posts/expressjs-and-passportjs-sessions-deep-dive)

asynchronous

[http://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron](http://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron)

# node-dirty

## Purpose

A tiny & fast key value store with append-only disk log. Ideal for apps with < 1 million records.

## Installation

```bash
npm install dirty
```

## Why dirty?

This module is called dirty because:

* The file format is newline separated JSON
* Your database lives in the same process as your application, they share memory
* There is no query language, you just `forEach` through all records

So dirty means that you will hit a very hard wall with this database after ~1 million records,
but it is a wonderful solution for anything smaller than that.

## Tutorial

```javascript
  var dirty = require('dirty');
  var db = dirty('user.db');

  db.on('load', function() {
    db.set('john', {eyes: 'blue'});
    console.log('Added john, he has %s eyes.', db.get('john').eyes);

    db.set('bob', {eyes: 'brown'}, function() {
      console.log('User bob is now saved on disk.')
    });

    db.forEach(function(key, val) {
      console.log('Found key: %s, val: %j', key, val);
    });
  });

  db.on('drain', function() {
    console.log('All records are saved on disk now.');
  });
```
Output:

    Added john, he has blue eyes.
    Found key: john, val: {"eyes":"blue"}
    Found key: bob, val: {"eyes":"brown"}
    User bob is now saved on disk.
    All records are saved on disk now.
