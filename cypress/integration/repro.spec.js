/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  //skip this test to see the second test timeout when it fails and tries to screenshot()
  //un-skip this test to see the second test NOT timeout (??)
  it.skip('does NOT time out during a normal cy.screenshot() call', () => {
    cy.get('.todo-list li').should('have.length', 2)

    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')

    //this screenshot() call should not timeout, 
    //and seems to help the NEXT call (by virtue of the failing test that follows) not timeout either (?)
    cy.screenshot() 
  })

  it('times out during the cy.screenshot() call upon test failure', () => {
    cy.get('.todo-list li').should('have.length', 2)

    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')

    //this line should fail and trigger cy.screenshot()
    cy.contains('Debug cypress!')
  })
})
