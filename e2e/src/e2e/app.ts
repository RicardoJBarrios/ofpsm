import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { getGreeting } from '../support/app.po';

When('I visit the app', () => {
  cy.visit('/');
});

Then('I should see the welcome message', () => {
  getGreeting().contains('Welcome ofpsm');
});
