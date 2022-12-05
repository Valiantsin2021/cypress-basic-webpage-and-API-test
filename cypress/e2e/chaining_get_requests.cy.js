/// <reference types="cypress" />

describe("Chaining GET request", () => {
    const accessToken =
      "74a0f57244e0409f6559a101882754255cd9b52f2285e2e1e6d428eb5253cb85";
    const baseUrl = "https://gorest.co.in/public/v2/users";
  
    it("Chaining Get request 1", () => {
      cy.request({
        method: "GET",
        url: baseUrl,
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => {
          expect(res.status).to.eq(200);
          const userId = res.body[0].id;
          return userId;
        })
        .then((userId) => {
          cy.request({
            method: "GET",
            url: `${baseUrl}/${userId}`,
            headers: {
              authorization: "Bearer " + accessToken,
            },
          }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).have.property("id", userId);
          });
        });
    });
  
    it("Chaining Get request with Iteration", () => {
      cy.request({
        method: "GET",
        url: baseUrl,
        headers: {
          authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => {
          expect(res.status).to.eq(200);
          const data = res.body;
          return data;
        })
        .then((data) => {
          data.forEach((element) => {
            cy.request({
              method: "GET",
              url: `${baseUrl}/${element.id}`,
              headers: {
                authorization: "Bearer " + accessToken,
              },
            }).then((res) => {
              expect(res.status).to.eq(200);
              expect(res.body).have.property("id", element.id);
            });
          });
        });
    });
  });