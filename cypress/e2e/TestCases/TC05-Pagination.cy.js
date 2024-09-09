describe('Amazon.in Pagination Testing', () => {
    before(() => {
      cy.visit('https://www.amazon.in/s?k=mobiles'); // Visit the search results page for mobiles
    });
  
    it('should navigate through pages and verify product listings', () => {
      let pageNumber = 1;
  
      const checkAndNavigate = () => {
        cy.log(`Testing page ${pageNumber}`);
  
        // Verify that there are product items on the current page
        cy.get('.s-main-slot .s-result-item').should('have.length.greaterThan', 0);
  
        // Check if the "Next" button is present and enabled
        cy.get('.s-pagination-next').then($nextButton => {
          if ($nextButton.length === 0 || $nextButton.is(':disabled')) {
            // If "Next" button is not present or disabled, stop the test
            cy.log('Last page reached or "Next" button not available.');
            return;
          }
  
          // Click "Next" button to go to the next page
          cy.get('.s-pagination-next').click();
  
          // Increment page number and wait for the next page to load
          pageNumber += 1;
          cy.wait(2000); // Adjust this wait time as necessary for the page to load
  
          // Recursively call the function to continue pagination
          checkAndNavigate();
        });
      };
  
      // Start the pagination test
      checkAndNavigate();
    });
  });
  