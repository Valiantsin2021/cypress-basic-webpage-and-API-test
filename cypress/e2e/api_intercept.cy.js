/// <reference types="cypress" />

describe("Intercept with cypress", () => {
  it("Test api with simple intercept stubbing", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept({
      path: "/posts",
    }).as("posts");
    cy.get("a").contains("/posts").click();
    cy.wait("@posts").then((interObj) => {
      cy.log(JSON.stringify(interObj));
      console.log(JSON.stringify(interObj));
      expect(interObj.response.body).to.have.length(100);
    });
  });

  it("Mocking with intercept test with static response", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", { totalPost: 5, name: "automation" }).as(
      "posts"
    );
    cy.get("a").contains("/posts").click();
    cy.wait("@posts");
  });

  it("Mocking with intercept test with dynamic fixture", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", { fixture: "apiPostUser.json" }).as("posts");
    cy.get("a").contains("/posts").click();
    cy.wait("@posts");
  });
});
