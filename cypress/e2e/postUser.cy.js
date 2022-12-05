/// <reference types="cypress" />

describe("Post API user tests", () => {
    const accessToken =
      "74a0f57244e0409f6559a101882754255cd9b52f2285e2e1e6d428eb5253cb85";
    const baseUrl = "https://gorest.co.in/public/v2/users";
  
    xit("Create new user test with hard-code data", () => {
      cy.request({
        method: "POST",
        url: baseUrl,
        headers: {
          authorization: "Bearer " + accessToken,
        },
        body: {
          name: "test automation 1",
          email: "example5@gmail.name",
          gender: "female",
          status: "inactive",
        },
      }).then((res) => {
        cy.log(JSON.stringify(res));
        expect(res.status).to.eq(201);
        expect(res.body).has.property("email", "example5@gmail.name");
      });
    });
  
    it("Create new user test with random input data", () => {
      const resultString = Math.random().toString(36).substring(2, 10);
      const randomEmail = resultString + "@gmail.com";
  
      cy.request({
        method: "POST",
        url: baseUrl,
        headers: {
          authorization: "Bearer " + accessToken,
        },
        body: {
          name: "test automation",
          email: randomEmail,
          gender: "female",
          status: "inactive",
        },
      }).then((res) => {
        // cy.log(JSON.stringify(res));
        expect(res.status).to.eq(201);
        expect(res.body).has.property("email", randomEmail);
      });
    });
  
    it("Request Chaining - POST and then GET", () => {
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
  
            // 3. Get new user information
            cy.request({
              method: "GET",
              url: `${baseUrl}/${userId}`,
              headers: {
                authorization: "Bearer " + accessToken,
              },
            }).then((res) => {
              expect(res.status).to.eq(200);
              expect(res.body).has.property("id", userId);
              expect(res.body).has.property("email", randomEmail);
              expect(res.body).has.property("name", payload.name);
              expect(res.body).has.property("gender", payload.gender);
              expect(res.body).has.property("status", payload.status);
            });
          });
      });
    });
  });