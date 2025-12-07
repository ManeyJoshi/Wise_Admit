const SignInPage = require("../../pages/SignInPage");

describe("WiseAdmit Sign-In", () => {

    beforeEach(() => {
        SignInPage.visit();
        
        cy.get("input[name='email']").should('be.visible');
    });

    it("Positive Test: Valid Login", () => {
        const email = Cypress.env("email");
        const password = Cypress.env("password");

        SignInPage.login(email, password);
        cy.url().should("include", "/dashboard", { timeout: 10000 });
    });

    it("Negative Test: Invalid Email", () => {
        cy.fixture("credentials").then((data) => {
            SignInPage.login(data.invalidEmail, Cypress.env("password"));
           
            SignInPage.errorMessage.should("be.visible");
        });
    });

    it("Negative Test: Invalid Password", () => {
        cy.fixture("credentials").then((data) => {
            SignInPage.login(Cypress.env("email"), data.invalidPassword);
            SignInPage.errorMessage.should("be.visible");
        });
    });

    it("Negative Test: Empty Fields", () => {   
        SignInPage.loginBtn.click({ force: true });
        cy.get('body').then($body => {
            if ($body.find('.error-message, [role="alert"]').length > 0) {
                SignInPage.errorMessage.should("be.visible");
            } else {
                SignInPage.loginBtn.should('be.disabled');
            }
        });
    });

});