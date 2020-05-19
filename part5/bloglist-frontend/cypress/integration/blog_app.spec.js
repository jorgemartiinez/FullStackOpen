describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Jorge',
      username: 'Jorge',
      password: '1234',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);

    cy.visit('http://localhost:3000');
  });
  it('Log in form is shown', function () {
    cy.get('#loginForm');
    cy.contains('Log in Form');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      // fill inputs
      cy.get('#username').type('Jorge');
      cy.get('#password').type('1234');
      // click log in
      cy.contains('Login').click();
      // check we are logged
      cy.contains('Jorge logged in');
      let noti = cy.contains('Logged in succesfully');
      noti.should('have.class', 'success');
    });

    it('fails with wrong credentials', function () {
      // fill inputs
      cy.get('#username').type('Jorge');
      cy.get('#password').type('1235');
      // click log in
      cy.contains('Login').click();
      // check we are logged
      let noti = cy.contains('wrong username or password');
      noti.should('have.class', 'error');
    });
  });
});

describe.only('When logged in', function () {
  beforeEach(function () {
    const user = {
      name: 'Jorge',
      username: 'Jorge',
      password: '1234',
    };
    const blog = {
      title: 'Cypress',
      author: 'Cypress',
      url: 'https://docs.cypress.io/',
      likes: 15,
    };

    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.request('POST', 'http://localhost:3001/api/blogs', blog);

    cy.login(user);
    cy.createBlog(blog);
    cy.visit('http://localhost:3000');
  });

  it('A blog can be created', function () {
    cy.contains('show add').click();

    cy.get('#addBlog');
    cy.get('#title').type('New blog 2');
    cy.get('#author').type('Cypress');
    cy.get('#url').type('https://docs.cypress.io/');
    cy.contains('Add').click();

    // new blog is displaying
    cy.contains('New blog 2');
    cy.contains('Cypress');
  });

  it.only('user can like a blog', function () {
    cy.contains('View').first().click();
    cy.contains('Like').first().click();
    cy.contains(16);
    cy.contains('like added to Cypress blog');
  });

  it('user that created a blog can delete it', function () {
    cy.contains('View').first().click();
    cy.contains('delete').first().click();
    cy.contains('Cypress').should('not.exist');
  });
});
