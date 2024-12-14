/// <reference types="Cypress" />
import { faker } from '@faker-js/faker/locale/id_ID';

describe('DEMO-01', () => {
   beforeEach(() => {
      cy.viewport(1800, 1200)
      cy.fixture("userData").as('Users')
      cy.visit('https://www.saucedemo.com/');
   });

   // context('Login', () => {
   //    it('login using locked_out_user', function () {
   //       cy.commands_login(this.Users.locked_out_user.username, this.Users.locked_out_user.password)
   //    });
   //    it('login using problem_user', function () {
   //       cy.commands_login(this.Users.problem_user.username, this.Users.problem_user.password)
   //    });

   //    it('login using error_user', function () {
   //       cy.commands_login(this.Users.error_user.username, this.Users.error_user.password)
   //    });

   //    it('login using performance_glitch_user', function () {
   //       cy.commands_login(this.Users.performance_glitch_user.username, this.Users.performance_glitch_user.password)
   //    });

   //    it('login using visual_user', function () {
   //       cy.commands_login(this.Users.visual_user.username, this.Users.visual_user.password)
   //    });

   //    it('login using valid credential', function () {
   //       cy.commands_login(this.Users.standar_user.username, this.Users.standar_user.password)
   //    });

   // });

   context('Scenario 1 : Login saucedemo', () => {
      it('Test case 1 : Verify successful login with valid credentials.', function () {
         cy.commands_login(this.Users.standard_user.username, this.Users.standard_user.password)
         cy.url().should('include', 'inventory.html');
         cy.get('.title').should('contain', 'Products');
         cy.screenshot('1. valid user')
      });

      it('test case 2 : Verify login with invalid credentials.', function () {
         cy.commands_login(this.Users.invalid_user.username, this.Users.invalid_user.password)
         cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username and password do not match');
         cy.screenshot('2. invalid user')
      });
   })

   context('Scenario 2 : Product Navigation Tests', () => {
      it('Test case 3: Verify that the product list loads after login', function () {
         cy.commands_login(this.Users.standard_user.username, this.Users.standard_user.password)
         cy.get('.inventory_item').should('have.length.greaterThan', 0);
         cy.screenshot('3. inventory shown')
      });

      it('Test case 4: Verify product details are displayed when a product is clicked.', function () {
         cy.commands_login(this.Users.standard_user.username, this.Users.standard_user.password)
         cy.get('.inventory_item_name').first().click()
         cy.get('.inventory_details_name').should('be.visible');
         cy.get('.inventory_details_price').should('be.visible');
         cy.screenshot('4. detail product')
      });

   })

   context('Product Purchase Tests', () => {
      it('Test case 5: Verify that adding a product to the cart works correctly', function () {
         cy.commands_login(this.Users.standard_user.username, this.Users.standard_user.password)
         cy.get('.inventory_container').find('[data-test="add-to-cart-sauce-labs-backpack"]').click()
         cy.get('.inventory_container').find('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
         cy.get('.inventory_container').find('[data-test="add-to-cart-sauce-labs-onesie"]').click()
         cy.get('.inventory_container').find('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
         cy.get('.shopping_cart_badge').should('contain', '4')
         cy.get('.shopping_cart_container').click()
         cy.screenshot('5. add product')
      });

      it('Test case 6: Verify the checkout process completes.', function () {
         cy.commands_login(this.Users.standard_user.username, this.Users.standard_user.password)
         cy.get('.inventory_container').find('[data-test="add-to-cart-sauce-labs-backpack"]').click()
         cy.get('.inventory_container').find('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
         cy.get('.inventory_container').find('[data-test="add-to-cart-sauce-labs-onesie"]').click()
         cy.get('.inventory_container').find('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
         cy.get('.shopping_cart_badge').should('contain', '4')
         cy.get('.shopping_cart_container').click()
         cy.get('[data-test="checkout"]').click()

         cy.get('[data-test="firstName"]').type(faker.person.firstName())
         cy.get('[data-test="lastName"]').type(faker.person.lastName())
         cy.get('[data-test="postalCode"]').type(faker.location.zipCode())

         cy.get('[data-test="continue"]').click()
         cy.get('[data-test="title"]').should('exist', 'Checkout: Overview')
         cy.get('[data-test="finish"]').click()

         cy.get('[data-test="complete-header"]').should('exist', 'Thank you for your order!')
         cy.screenshot('6. finish order')

      });
   })


});
