// const faker = require('faker') // Import faker for random data generation
const { faker } = require('@faker-js/faker');  // Import the correct faker package
const env = Cypress.env("env") || "dev"; // Default to 'dev' if not set
describe('Form submission with Random data', () => {
    
    before(()=>{

     // Load the fixture file
     cy.fixture(`${env}/userData.json`).then((data)=>{
        data.firstName = faker.name.firstName();  // Generate random first name
        data.lastName = faker.name.lastName();    // Generate random last name
        data.email = faker.internet.email();      // Generate random email
        data.comments = faker.lorem.sentence();   // Generate random comment

     // Set environment variables for later use
        Cypress.env('userData', data);
      
     })

    })

    it('Should submit the form with random data', () => {
        
        const userData = Cypress.env('userData');  // Retrieve the generated data

        cy.visit('/Contact-Us/contactus.html')

        // Perform login steps
        cy.get('input[name="first_name"]').type(userData.firstName);
        cy.get('input[name="last_name"]').type(userData.lastName);
        cy.get('input[name="email"]').type(userData.email);
        cy.get('textarea[name="message"]').type(userData.comments);
        cy.get('input[type="submit"]').click()
    
        // Verify welcome message
        cy.get('h1').should('have.text', userData.expectedMessage);

    });


});
