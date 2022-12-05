/// <reference types="cypress" />

describe("Get API user tests", () => {
    const accessToken =
      "74a0f57244e0409f6559a101882754255cd9b52f2285e2e1e6d428eb5253cb85";
    const baseUrl = "https://gorest.co.in/public/v2/users";
  
    it("Get all users", () => {
      cy.request({
        method: "GET",
        url: baseUrl,
        headers: {
          authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  
    it("Get user by id", () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/5037`,
        headers: {
          authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.name).to.eq("Gov. Vyas Pilla");
      });
    });
  });