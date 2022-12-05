/// <reference types="cypress" />

describe("Post API user tests", () => {
    const accessToken =
      "74a0f57244e0409f6559a101882754255cd9b52f2285e2e1e6d428eb5253cb85";
    const baseUrl = "https://gorest.co.in/public/v2/users";
  
    it("Request Chaining - POST and then DELETE", () => {
      const resultString = Math.random().toString(36).substring(2, 10);
      const randomEmail = resultString + "@gmail.com";
  
      cy.fixture("apiPostUser").then((payload) => {
        // 1. Create new user
        cy.request({
          method: "POST",
          url: baseUrl,
          headers: {
            authorization: "Bearer " + accessToken,
          },
          body: {
            name: payload.name,
            email: randomEmail,
            gender: payload.gender,
            status: payload.status,
          },
        })
          .then((res) => {
            // cy.log(JSON.stringify(res));
            expect(res.status).to.eq(201);
            expect(res.body).has.property("email", randomEmail);
            expect(res.body).has.property("name", payload.name);
            expect(res.body).has.property("gender", payload.gender);
            expect(res.body).has.property("status", payload.status);
          })
          .then((res) => {
            // 2. Get id of new user
            const userId = res.body.id;
            cy.log("user Id is: " + userId);
  
            // 3. Delete new user
            cy.request({
              method: "DELETE",
              url: `${baseUrl}/${userId}`,
              headers: {
                authorization: "Bearer " + accessToken,
              },
            }).then((res) => {
              expect(res.status).to.eq(204); // PUT request get status 200
            });
          });
      });
    });
  });