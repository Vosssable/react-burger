describe('Constructor Page - Full User Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients*', { fixture: 'ingredients.json' }).as('getIngredients')
    cy.visit('/react-burger')
    cy.wait('@getIngredients', { timeout: 10000 })
  })

  it('should display ingredients list', () => {
    cy.contains('Краторная булка N-200i').should('be.visible')
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible')
    cy.contains('Соус Spicy-X').should('be.visible')
  })

  it('should drag and drop bun to constructor', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').should('be.visible')
    cy.get('[data-testid="constructor-drop-target"]').should('be.visible')
    
    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]', '[data-testid="constructor-drop-target"]')

    cy.contains('Краторная булка N-200i (верх)').should('be.visible')
    cy.contains('Краторная булка N-200i (низ)').should('be.visible')
  })

  it('should drag and drop ingredient to constructor', () => {
    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]', '[data-testid="constructor-drop-target"]')
    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]', '[data-testid="constructor-drop-target"]')

    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible')
  })

  it('should calculate total price', () => {
    const bunPrice = 1255
    const ingredientPrice = 424

    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]', '[data-testid="constructor-drop-target"]')
    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]', '[data-testid="constructor-drop-target"]')

    const expectedTotal = bunPrice * 2 + ingredientPrice
    cy.contains(expectedTotal.toString()).should('be.visible')
  })

  it('should show login page when trying to create order without authentication', () => {
    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]', '[data-testid="constructor-drop-target"]')

    cy.contains('Оформить заказ').click()
    cy.url().should('include', '/login')
  })

  it('should create order and show modal when authenticated', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'asdfklfalsf@asdfas.ru', name: 'rambler111' },
        accessToken: 'Bearer 98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7',
        refreshToken: '98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7',
      },
    }).as('login')

    cy.intercept('POST', '**/api/auth/token', {
      statusCode: 200,
      body: {
        success: true,
        accessToken: 'Bearer 98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7',
        refreshToken: '98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7',
      },
    }).as('refreshToken')

    cy.intercept('GET', '**/api/auth/user*', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'asdfklfalsf@asdfas.ru', name: 'rambler111' },
      },
    }).as('getUser')

    cy.intercept('POST', '**/api/orders*', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Space флюоресцентный антарианский люминесцентный бургер',
        order: { number: 12345 },
      },
    }).as('createOrder')

    cy.login('asdfklfalsf@asdfas.ru', 'qwerty123')

    // Visit a protected route first to trigger authentication
    cy.visit('/react-burger/profile')
    cy.wait('@refreshToken')
    cy.wait('@getUser')
    
    // Navigate to home page using header link to preserve Redux state
    cy.contains('Конструктор').click()
    cy.wait('@getIngredients')

    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]', '[data-testid="constructor-drop-target"]')
    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]', '[data-testid="constructor-drop-target"]')

    cy.contains('Оформить заказ').should('be.enabled').click()
    cy.wait('@createOrder')

    cy.contains('12345').should('be.visible')
    cy.contains('идентификатор заказа', { matchCase: false }).should('be.visible')
    cy.contains('Ваш заказ начали готовить', { matchCase: false }).should('be.visible')
  })

  it('should close modal after creating order', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'asdfklfalsf@asdfas.ru', name: 'rambler111' },
        accessToken: 'Bearer 98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7',
        refreshToken: '98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7',
      },
    }).as('login')

    cy.intercept('POST', '**/api/auth/token', {
      statusCode: 200,
      body: {
        success: true,
        accessToken: 'Bearer 98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7',
        refreshToken: '98765f1822c0cb92c9db99ca331bc36f2199e79fe1df0138f5f59865cc2d61377318b5f490f4aee7',
      },
    }).as('refreshToken')

    cy.intercept('GET', '**/api/auth/user*', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'asdfklfalsf@asdfas.ru', name: 'rambler111' },
      },
    }).as('getUser')

    cy.intercept('POST', '**/api/orders*', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Space флюоресцентный антарианский люминесцентный бургер',
        order: { number: 12345 },
      },
    }).as('createOrder')

    cy.login('asdfklfalsf@asdfas.ru', 'qwerty123')

    // Visit a protected route first to trigger authentication
    cy.visit('/react-burger/profile')
    cy.wait('@refreshToken')
    cy.wait('@getUser')
    
    // Navigate to home page using header link to preserve Redux state
    cy.contains('Конструктор').click()
    cy.wait('@getIngredients')

    cy.dragAndDrop('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]', '[data-testid="constructor-drop-target"]')

    cy.contains('Оформить заказ').click()
    cy.wait('@createOrder')

    cy.contains('12345').should('be.visible')
    
    // Close modal using ESC key (modal supports keyboard closing)
    cy.get('body').type('{esc}')

    cy.contains('12345').should('not.exist')
  })
})
