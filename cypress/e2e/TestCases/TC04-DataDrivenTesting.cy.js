
const env = Cypress.env("env") || "dev"; // Default to 'dev' if not set
describe('Form Submission with Data-Driven Testing', () => {
    before(() => {
      // Load the fixture file containing different sets of data
      cy.fixture(`${env}/userDataSets.json`).as('userDataSets');  // Alias the data for easy access
    });
  
    it('should submit the form with multiple data sets', function() {
      // Access the loaded fixture data
      const userDataSets = this.userDataSets;
  
      // Iterate over each data set and run the test
      userDataSets.forEach((data) => {
        cy.visit('/Contact-Us/contactus.html')
  
        // Fill in the form with data from the current data set
        cy.get('input[name="first_name"]').type(data.firstName);
        cy.get('input[name="last_name"]').type(data.lastName);
        cy.get('input[name="email"]').type(data.email);
        cy.get('textarea[name="message"]').type(data.comment);
  
        // Submit the form
        cy.get('input[type="submit"]').click();
  
        // Verify the submission was successful
        cy.get('h1').should('have.text', data.expectedMessage);
  
        // Optionally, you may need to reset the form or navigate away to avoid conflicts between iterations
      });
    });
  });
  