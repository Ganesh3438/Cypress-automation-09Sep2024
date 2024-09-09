const env = Cypress.env("env") || "dev"; // Default to 'dev' if not set
describe("", () => {
  
    before(() => {
        // Dynamically load the appropriate environment-specific data
        cy.fixture(`${env}/loginPage.json`).then((data) => {
          Cypress.env('firstName', data.firstName);
          Cypress.env('lastName', data.lastName);
          Cypress.env('email', data.email);
          Cypress.env('comment', data.comment);
          Cypress.env('welcomeMessage', data.welcomeMessage);
        });
      });

      it('Creation contact us and verify the welcome message', () => {
        const firstName = Cypress.env('firstName');
        const lastName = Cypress.env('lastName');
        const email = Cypress.env('email');
        const comment = Cypress.env('comment');
        const expectedMessage = Cypress.env('welcomeMessage');
    
        // cy.visit('/login');  // Assuming your baseUrl is set in config or passed via command line

        cy.visit('/Contact-Us/contactus.html')
    
        // Perform login steps
        cy.get('input[name="first_name"]').type(firstName);
        cy.get('input[name="last_name"]').type(lastName);
        cy.get('input[name="email"]').type(email);
        cy.get('textarea[name="message"]').type(comment);
        cy.get('input[type="submit"]').click()
    
        // Verify welcome message
        cy.get('h1').should('have.text', expectedMessage);
      });
    });





