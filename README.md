# Givey JavaScript SDK

[![Code Climate](https://codeclimate.com/github/givey/js-sdk/badges/gpa.svg)](https://codeclimate.com/github/givey/js-sdk)
[![Build Status](https://travis-ci.org/givey/js-sdk.png?branch=master)](https://travis-ci.org/givey/js-sdk)


## Usage

### Create a new instance

Before using the Givey API you will want to create a new instance to work with. You will require an access token which can be obtained from the [Givey Developer Portal](https://www.givey.com/developers).

``` js
var Givey = new GiveyApp({
  token: "XXXX"
});
```


### Loading an Entity

There are many entities on Givey which can be interacted with. The current entity list contains Charity, User, Business and Donation.

``` js
Givey.find('business', 'giveybiz').then(function (business) {
  business.get('name'); // Givey Ltd
});
```


### Relationships

Entities can contain relationships to other entities which are resolved asynchronously. Relationships are not resolved until the first time they are called via ```entity.get()```.

``` js
Givey.find('business', 'giveybiz').then(function (business) {
  business.get('employees').then(function (employees) {
    $.each(employees, function (_, user) {
      user.get('giveyTag');
    });
  });
});
```
