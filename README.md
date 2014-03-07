# Givey JavaScript SDK

Library for interacting with the GiveyAPI in the browser.


## Usage

### Create a new instance

Before using the Givey API you will want to create a new instance to work with.

``` js
var Givey = new GiveyApp(options);
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
