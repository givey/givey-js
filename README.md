# Givey JavaScript SDK

Library for interacting with the GiveyAPI in the browser.


## Usage

Before using the Givey API you will want to create a new instance to work with.


### Create a new instance

``` js
var Givey = new GiveyApp(options);
```


### Find a Business

``` js
Givey.find('business', 'giveybiz').then(renderBusiness);
```


### Find a charity

``` js
Givey.find('charity', 'dogstrust').then(renderCharity);
```
