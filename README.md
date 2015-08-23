clindsey/marvelAngular - [view the demo](http://clindsey.github.io/marvelAngular/)

Requirements
---
* Marvel developer account key [https://developer.marvel.com/account]
* Add your domain to your Marvel developer account's accepted referrer's list

Dependencies
---
* git
* npm and node

Local Dev
---
Add your Marvel developer account key [https://developer.marvel.com/account]
* `cp app/config_example.coffee app/config.coffee`
* edit `app/config.coffee` and add your own Marvel `apiKey`

Install npm and bower packages:
* `make install`

Start the local development server:
* `make watch`

Generate a minified version of the css and javascripts
* `make build`
