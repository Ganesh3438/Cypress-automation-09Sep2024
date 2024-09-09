describe('My first test case', function(){

it('Lauching webdriveruniversity application', function(){



// cy.visit('/');  // Uses the `baseUrl` set in `cypress.config.js`
// cy.visit('https://www.webdriveruniversity.com/Contact-Us/contactus.html')

cy.visit('/Contact-Us/contactus.html')

const expectedTitle = 'WebDriver | Contact Us'
    
cy.title().then((title)=>{

    cy.log('Page Title:'  + title)
    expect(title).to.eq(expectedTitle)

})

// Perform UI login flow
cy.get('input[name="first_name"]').type('Ram');
cy.get('input[name="last_name"]').type('Kumar');
cy.get('input[name="email"]').type('test@mailinator.com');
cy.get('textarea[name="message"]').type('Testing');
cy.get('input[type="submit"]').click()

const expectedMessage = "Thank You for your Message!"
cy.get('h1').should('have.text', expectedMessage)

// Verify successful login
// cy.url().should('include', '/dashboard');

})


})