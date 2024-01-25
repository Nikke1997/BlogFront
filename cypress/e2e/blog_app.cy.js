describe("Blog ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "test",
      username: "test",
      password: "test",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
  });

  describe("Login", function () {
    it("login fails with wrong password", function () {
      cy.get("#uname").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("Wrong credentials");
    });

    it("succeeds with correct credentials", function () {
      cy.get("#uname").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.contains("Logged in successfully");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#uname").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
      cy.contains("New Blog").click();
      cy.get("#title").type("Test Title");
      cy.get("#Author").type("Test Author");
      cy.get("#url").type("www.test.com");
      cy.get("#save").click();
    });

    it("new blog can be created", function () {
      cy.contains("new blog Test Title by Test Author added");
    });

    it("user can like a blog", function () {
      cy.contains("view").click();
      cy.contains("Like").click();
      cy.contains("Likes: 1");
    });

    it("user can delete a blog", function () {
      cy.contains("view").click();
      cy.contains("Remove").click();
      cy.contains("Blog Test Title by Test Author removed");
    });

    it("Only the user who created a blog can delete it", function () {
      cy.contains("Remove");
      cy.contains("Log Out").click();
      const user = {
        name: "test2",
        username: "test2",
        password: "test2",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.get("#uname").type("test2");
      cy.get("#password").type("test2");
      cy.get("#login-button").click();
      cy.contains("view").click();
      cy.contains("Remove").should("not.exist");
    });
  });
  describe("and several blogs exist", function () {
    it.only("blogs are ordered according to likes", function () {
      cy.get("#uname").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
      cy.contains("New Blog").click();
      cy.get("#title").type("Test Title");
      cy.get("#Author").type("Test Author");
      cy.get("#url").type("www.test.com");
      cy.get("#save").click();
      cy.contains("New Blog").click();
      cy.get("#title").type("Test Title2");
      cy.get("#Author").type("Test Author2");
      cy.get("#url").type("www.test2.com");
      cy.get("#save").click();
      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).contains("view").click();
        cy.wrap(blogs[0]).contains("Like").click();
        cy.wrap(blogs[1]).contains("view").click();
        cy.wrap(blogs[1]).contains("Like").click();
        cy.wrap(blogs[1]).contains("Like").click();
        cy.get(".blog").eq(0).should("contain", "Test Title2");
      });
    });
  });
});
