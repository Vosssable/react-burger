/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      dragAndDrop(sourceSelector: string, targetSelector: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  // For testing, we set localStorage directly with mock data
  // This works with the intercepts set up in tests
  cy.window().then((win) => {
    const mockUser = { email, name: 'rambler111' }
    // Only set refreshToken - the app will use this to get accessToken
    win.localStorage.setItem('refreshToken', '98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7')
    win.localStorage.setItem('user', JSON.stringify(mockUser))
  })
})

Cypress.Commands.add('dragAndDrop', (sourceSelector: string, targetSelector: string) => {
  cy.get(sourceSelector).then(($source) => {
    cy.get(targetSelector).then(($target) => {
      const dataTransfer = new DataTransfer()
      
      // Trigger dragstart on source
      $source[0].dispatchEvent(new DragEvent('dragstart', { bubbles: true, cancelable: true, dataTransfer }))
      
      // Trigger dragenter and dragover on target
      $target[0].dispatchEvent(new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer }))
      const dragOverEvent = new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer })
      dragOverEvent.preventDefault()
      $target[0].dispatchEvent(dragOverEvent)
      
      // Trigger drop on target
      $target[0].dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }))
      
      // Trigger dragend on source
      $source[0].dispatchEvent(new DragEvent('dragend', { bubbles: true, cancelable: true, dataTransfer }))
    })
  })
})

export {}

