/// <reference types="cypress" />

describe("Post API user tests", () => {
    const accessToken =
      "74a0f57244e0409f6559a101882754255cd9b52f2285e2e1e6d428eb5253cb85";
    const baseUrl = "https://gorest.co.in/public/v2/users";
  
    it("Request Chaining - POST and then PUT", () => {
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
            const string = Math.random().toString(36).substring(2, 10);
            const randEmail = string + "@gmail.com";
            // 2. Get id of new user
            const userId = res.body.id;
            cy.log("user Id is: " + userId);
  
            // 3. Update new user
            cy.request({
              method: "PUT",
              url: `${baseUrl}/${userId}`,
              headers: {
                authorization: "Bearer " + accessToken,
              },
              body: {
                name: "Test automation Updated",
                email: randEmail,
                gender: "male",
                status: "inactive",
              },
            }).then((res) => {
              expect(res.status).to.eq(200); // PUT request get status 200
              expect(res.body).has.property("id", userId);
              expect(res.body).has.property("email", randEmail);
              expect(res.body).has.property("name", "Test automation Updated");
              expect(res.body).has.property("gender", "male");
              expect(res.body).has.property("status", "inactive");
            });
          });
      });
    });
  });