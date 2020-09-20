'use strict';

const { I } = inject();
const faker = require('faker');

let username = null;
let password = null;

Given('the Client can display the acl view', () => {
  I.amOnPage('/');
  I.click('Authorization/ACL');
});

Given('the Client can set a the api url', () => {
  I.click('#open-settings');
  I.click('Base API URL');
  I.fillField('input[class="MuiInputBase-input MuiInput-input"]', process.env.CLI_BACKEND_URL || process.env.GRADIATOR_BACKEND_URL || 'http://localhost:3000');
  I.click('Set API URL');
});

When('the Client signs up as a user', () => {
  username = faker.name.firstName();
  password = faker.random.word();

  I.fillField('#signup-user', username);
  I.fillField('#signup-pass', password);
  I.click('Sign Up');
});

When('the Client signs up as an admin', () => {
  username = faker.name.firstName();
  password = faker.random.word();

  I.fillField('#signup-user', username);
  I.fillField('#signup-pass', password);
  I.pressKey("Tab");
  I.pressKey("Enter");
  I.pressKey("ArrowDown");
  I.pressKey("ArrowDown");
  I.pressKey("ArrowDown");
  I.pressKey("Enter");
  I.pressKey('Tab');
  I.pressKey('Enter');
});

When('the Client selects the {string} capability', (capability) => {
  I.click(capability);
});

Then('the Client displays {string}', (output) => {
  I.see(output);
});