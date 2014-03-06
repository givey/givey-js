# Givey JavaScript SDK

Library for interacting with the GiveyAPI in the browser.


## Usage

All interaction is done via the global ```GiveyApi``` instance.


### Find a Business

``` js
Givey.find('business', 'giveybiz').then(renderBusiness);
```

### Find a charity

``` js
Givey.find('charity', 'dogstrust').then(renderCharity);
```
