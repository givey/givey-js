module('capitalize');
test('lowercase input', function () {
  equal('hello world'.capitalize(), 'Hello world');
});
test('random upcase characters are preserved', function () {
  equal('hello World'.capitalize(), 'Hello World');
});
test('only the first letter is transformed', function () {
  equal('hELLO wORLD'.capitalize(), 'HELLO wORLD');
});

module('camelize');
test('lowercase input', function() {
  equal('hello_world'.camelize(), 'helloWorld');
});
test('upcase characters', function () {
  equal('Hello_World'.camelize(), 'helloWorld');
});
test('multiple underscores', function () {
  equal('Hello_World_Again'.camelize(), 'helloWorldAgain');
});

module('pluralize');
test('user', function() {
  equal('user'.pluralize(), 'users');
});
test('charity', function () {
  equal('charity'.pluralize(), 'charities');
});
test('channel', function () {
  equal('channel'.pluralize(), 'channels');
});
test('business', function () {
  equal('business'.pluralize(), 'businesses');
});
test('donation', function () {
  equal('donation'.pluralize(), 'donations');
});
test('givey_rule', function () {
  equal('givey_rule'.pluralize(), 'givey_rules');
});
test('default', function () {
  equal('dog'.pluralize(), 'dogs');
});
