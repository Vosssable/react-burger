describe('Constructor Page - Full User Flow', () => {
  // Selector constants
  const BUN_INGREDIENT_ID = '643d69a5c3f7b9001cfa093c'
  const MAIN_INGREDIENT_ID = '643d69a5c3f7b9001cfa0941'
  const SELECTOR_BUN_INGREDIENT = `[data-testid="ingredient-${BUN_INGREDIENT_ID}"]`
  const SELECTOR_MAIN_INGREDIENT = `[data-testid="ingredient-${MAIN_INGREDIENT_ID}"]`
  const SELECTOR_DROP_TARGET = '[data-testid="constructor-drop-target"]'
  const SELECTOR_ORDER_BUTTON = 'Оформить заказ'

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
    cy.get(SELECTOR_BUN_INGREDIENT).as('bunIngredient').should('be.visible')
    cy.get(SELECTOR_DROP_TARGET).as('dropTarget').should('be.visible')
    
    cy.dragAndDrop(SELECTOR_BUN_INGREDIENT, SELECTOR_DROP_TARGET)

    cy.contains('Краторная булка N-200i (верх)').should('be.visible')
    cy.contains('Краторная булка N-200i (низ)').should('be.visible')
  })

  it('should drag and drop ingredient to constructor', () => {
    cy.dragAndDrop(SELECTOR_BUN_INGREDIENT, SELECTOR_DROP_TARGET)
    cy.dragAndDrop(SELECTOR_MAIN_INGREDIENT, SELECTOR_DROP_TARGET)

    cy.contains('Биокотлета из марсианской Магнолии')
      .scrollIntoView()
      .should('be.visible')
  })

  it('should calculate total price', () => {
    const bunPrice = 1255
    const ingredientPrice = 424

    cy.dragAndDrop(SELECTOR_BUN_INGREDIENT, SELECTOR_DROP_TARGET)
    cy.dragAndDrop(SELECTOR_MAIN_INGREDIENT, SELECTOR_DROP_TARGET)

    const expectedTotal = bunPrice * 2 + ingredientPrice
    cy.contains(expectedTotal.toString()).should('be.visible')
  })

  it('should show login page when trying to create order without authentication', () => {
    cy.dragAndDrop(SELECTOR_BUN_INGREDIENT, SELECTOR_DROP_TARGET)

    cy.contains(SELECTOR_ORDER_BUTTON).as('orderButton').click()
    cy.url().should('include', '/login')
  })

  describe('Authenticated user flow', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/api/auth/login', { fixture: 'auth.json' }).as('login')
      cy.intercept('POST', '**/api/auth/token', { fixture: 'token.json' }).as('refreshToken')
      cy.intercept('GET', '**/api/auth/user*', { fixture: 'user.json' }).as('getUser')
      cy.intercept('POST', '**/api/orders*', { fixture: 'order.json' }).as('createOrder')

      cy.login('asdfklfalsf@asdfas.ru', 'qwerty123')

      cy.visit('/react-burger/profile')
      cy.wait('@refreshToken')
      cy.wait('@getUser')
      
      cy.contains('Конструктор').click()
      cy.wait('@getIngredients')
    })

    it('should create order and show modal when authenticated', () => {
      cy.dragAndDrop(SELECTOR_BUN_INGREDIENT, SELECTOR_DROP_TARGET)
      cy.dragAndDrop(SELECTOR_MAIN_INGREDIENT, SELECTOR_DROP_TARGET)

      cy.contains(SELECTOR_ORDER_BUTTON).as('orderButton').should('be.enabled').click()
      cy.wait('@createOrder')

      cy.contains('12345').as('orderNumber').should('be.visible')
      cy.contains('идентификатор заказа', { matchCase: false }).should('be.visible')
      cy.contains('Ваш заказ начали готовить', { matchCase: false }).should('be.visible')
    })

    it('should close modal after creating order', () => {
      cy.dragAndDrop(SELECTOR_BUN_INGREDIENT, SELECTOR_DROP_TARGET)

      cy.contains(SELECTOR_ORDER_BUTTON).as('orderButton').click()
      cy.wait('@createOrder')

      cy.contains('12345').as('orderNumber').should('be.visible')
      
      cy.get('body').type('{esc}')

      cy.get('@orderNumber').should('not.exist')
    })
  })
})
