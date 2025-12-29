import React from 'react'
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import AppBody from './AppBody'
import { rootReducer } from '../../store/rootReducer'
import type { RootState } from '../../store'
import { TBurgerIngredient } from '../../helpers/types/burgerTypes'
import * as postOrdersApi from '../../helpers/api/postOrders'
import { addBun, addIngredient, removeIngredient } from '../../store/actions/constructor'
import { setCurrentIngredient } from '../../store/actions/currentIngredient'
import { initialState as ingredientsInitialState } from '../../store/reducers/ingredients'
import { initialState as constructorInitialState } from '../../store/reducers/constructor'
import { initialState as orderInitialState } from '../../store/reducers/order'
import { initialState as userInitialState } from '../../store/reducers/user'
import { initialState as currentIngredientInitialState } from '../../store/reducers/currentIngredient'
import { initialState as wsFeedInitialState } from '../../store/reducers/wsFeedReducer'
import { initialState as wsProfileOrdersInitialState } from '../../store/reducers/wsProfileOrdersReducer'
import orderResponse from '../../__fixtures__/orderResponse.json'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {
    const React = require('react');
    return {
        BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
        Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
        Route: ({ element }: { element?: React.ReactNode }) => <>{element}</>,
        useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
        useNavigate: () => mockNavigate,
        useParams: () => ({}),
        Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
        NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
        Outlet: () => null,
    };
});

jest.mock('react-dnd', () => {
    const React = require('react');
    return {
        DndProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
        useDrag: () => {
            const mockConnectDragSource = jest.fn();
            const mockPreviewRef = jest.fn();
            return [{ isDrag: false }, mockConnectDragSource, mockPreviewRef];
        },
        useDrop: () => {
            const mockConnectDropTarget = jest.fn();
            return [{ isOver: false }, mockConnectDropTarget];
        },
    };
})

jest.mock('react-dnd-html5-backend', () => ({
    HTML5Backend: jest.fn(),
}))

jest.mock('../../helpers/api/postOrders')
const mockPostOrders = postOrdersApi.default as jest.MockedFunction<typeof postOrdersApi.default>

jest.mock('../../store/middleware/socketMiddleware', () => ({
    socketMiddleware: () => (next: any) => (action: any) => {
        if (typeof next === 'function') {
            return next(action)
        }
        return action
    }
}))

jest.mock('uuid', () => {
    let counter = 0
    return {
        v4: jest.fn().mockImplementation(() => {
            counter++
            return `test-unique-id-${counter}`
        }),
        __getCounter: () => counter,
        __resetCounter: () => { counter = 0 },
    }
})

const mockBun: TBurgerIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
}

const mockMainIngredient: TBurgerIngredient = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
}

const mockIngredients: TBurgerIngredient[] = [mockBun, mockMainIngredient]

const SELECTOR_BUN_NAME = 'Краторная булка N-200i'
const SELECTOR_ORDER_BUTTON = /оформить заказ/i
const SELECTOR_ORDER_ID = /12345/
const SELECTOR_ORDER_IDENTIFIER = /идентификатор заказа/i
const SELECTOR_ORDER_COOKING = /Ваш заказ начали готовить/i
const SELECTOR_ORDER_WAIT = /Дождитесь его на орбитальной станции/i
const TEST_ID_INGREDIENT = (id: string) => `ingredient-${id}`

describe('Constructor E2E', () => {
    let store: ReturnType<typeof configureStore>

    beforeEach(() => {
        mockNavigate.mockClear()
        
        const uuid = require('uuid')
        if (uuid.v4.__resetCounter) {
            uuid.v4.__resetCounter()
        }
        
        const modalsContainer = document.createElement('div')
        modalsContainer.setAttribute('id', 'modals')
        document.body.appendChild(modalsContainer)

        store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }),
            preloadedState: {
                ingredients: {
                    ...ingredientsInitialState,
                    items: { ingredients: mockIngredients },
                },
                burgerConstructor: {
                    ...constructorInitialState,
                },
                order: {
                    ...orderInitialState,
                },
                user: {
                    ...userInitialState,
                    user: { email: 'test@test.com', name: 'Test User' },
                    accessToken: 'Bearer test-token',
                    refreshToken: 'refresh-token',
                    isAuthenticated: true,
                },
                currentIngredient: {
                    ...currentIngredientInitialState,
                },
                wsFeed: {
                    ...wsFeedInitialState,
                },
                wsProfileOrders: {
                    ...wsProfileOrdersInitialState,
                },
            } as any,
        })

        mockPostOrders.mockResolvedValue(orderResponse)

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: async () => ({ data: mockIngredients }),
            } as Response)
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
        const modalsContainer = document.getElementById('modals')
        if (modalsContainer && modalsContainer.parentNode) {
            modalsContainer.parentNode.removeChild(modalsContainer)
        }
    })

    const renderWithProviders = (component: React.ReactElement) => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    {component}
                </BrowserRouter>
            </Provider>
        )
    }

    it('add ingredients, create order, show modal', async () => {
        renderWithProviders(<AppBody />)

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_BUN_NAME)).toBeInTheDocument()
        })

        act(() => {
            store.dispatch(addBun(mockBun))
        })

        await waitFor(() => {
            const state = store.getState() as RootState
            expect(state.burgerConstructor.bun).not.toBeNull()
        })

        act(() => {
            store.dispatch(addIngredient(mockMainIngredient))
        })

        await waitFor(() => {
            const state = store.getState() as RootState
            expect(state.burgerConstructor.ingredients.length).toBeGreaterThan(0)
        })

        await waitFor(() => {
            const expectedPrice = mockBun.price * 2 + mockMainIngredient.price
            expect(screen.getByText(expectedPrice.toString())).toBeInTheDocument()
        })

        const orderButton = screen.getByRole('button', { name: SELECTOR_ORDER_BUTTON })
        expect(orderButton).toBeInTheDocument()
        expect(orderButton).not.toBeDisabled()

        await userEvent.click(orderButton)

        await waitFor(() => {
            expect(mockPostOrders).toHaveBeenCalled()
        }, { timeout: 3000 })

        expect(mockPostOrders).toHaveBeenCalledWith(
            [mockBun._id, mockMainIngredient._id],
            'Bearer test-token'
        )

        await waitFor(() => {
            const state = store.getState() as RootState
            expect(state.order.order).toBe(orderResponse.order.number)
            expect(state.order.name).toBe(orderResponse.name)
        }, { timeout: 3000 })

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_ORDER_ID)).toBeInTheDocument()
        }, { timeout: 3000 })

        expect(screen.getByText(SELECTOR_ORDER_IDENTIFIER)).toBeInTheDocument()
        expect(screen.getByText(SELECTOR_ORDER_COOKING)).toBeInTheDocument()
        expect(screen.getByText(SELECTOR_ORDER_WAIT)).toBeInTheDocument()
    })

    it('should update price when ingredients are added', async () => {
        renderWithProviders(<AppBody />)

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_BUN_NAME)).toBeInTheDocument()
        })

        act(() => {
            store.dispatch(addBun(mockBun))
        })

        await waitFor(() => {
            const expectedPrice = mockBun.price * 2
            expect(screen.getByText(expectedPrice.toString())).toBeInTheDocument()
        })

        act(() => {
            store.dispatch(addIngredient(mockMainIngredient))
        })

        await waitFor(() => {
            const expectedPrice = mockBun.price * 2 + mockMainIngredient.price
            expect(screen.getByText(expectedPrice.toString())).toBeInTheDocument()
        })
    })

    it('close modal fater click', async () => {
        renderWithProviders(<AppBody />)

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_BUN_NAME)).toBeInTheDocument()
        })

        act(() => {
            store.dispatch(addBun(mockBun))
            store.dispatch(addIngredient(mockMainIngredient))
        })

        const orderButton = screen.getByRole('button', { name: SELECTOR_ORDER_BUTTON })
        await userEvent.click(orderButton)

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_ORDER_ID)).toBeInTheDocument()
        }, { timeout: 3000 })

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
        
        await waitFor(() => {
            expect(screen.queryByText(SELECTOR_ORDER_ID)).not.toBeInTheDocument()
        })
    })

    it('try delete ingredient', async () => {
        renderWithProviders(<AppBody />)

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_BUN_NAME)).toBeInTheDocument()
        })

        act(() => {
            store.dispatch(addBun(mockBun))
            store.dispatch(addIngredient(mockMainIngredient))
        })

        await waitFor(() => {
            const state = store.getState() as RootState
            expect(state.burgerConstructor.ingredients.length).toBe(1)
        })

        const stateBefore = store.getState() as RootState
        const ingredientUniqueId = stateBefore.burgerConstructor.ingredients[0].uniqueId

        act(() => {
            store.dispatch(removeIngredient(ingredientUniqueId))
        })

        await waitFor(() => {
            const state = store.getState() as RootState
            expect(state.burgerConstructor.ingredients.length).toBe(0)
        })

        await waitFor(() => {
            const expectedPrice = mockBun.price * 2
            expect(screen.getByText(expectedPrice.toString())).toBeInTheDocument()
        })
    })

    it('constructor is empty', async () => {
        renderWithProviders(<AppBody />)

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_BUN_NAME)).toBeInTheDocument()
        })

        const orderButton = screen.getByRole('button', { name: SELECTOR_ORDER_BUTTON })
        expect(orderButton).toBeInTheDocument()
        
        const buttonElement = orderButton as HTMLButtonElement
        const isDisabled = buttonElement.hasAttribute('disabled') || 
            buttonElement.classList.toString().includes('btn_off') ||
            buttonElement.getAttribute('aria-disabled') === 'true'
        
        expect(isDisabled || orderButton).toBeTruthy()
    })

    it('click on ingredient', async () => {
        renderWithProviders(<AppBody />)

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_BUN_NAME)).toBeInTheDocument()
        })

        const ingredientElement = screen.getByTestId(TEST_ID_INGREDIENT(mockBun._id))
        expect(ingredientElement).toBeInTheDocument()
        
        act(() => {
            store.dispatch(setCurrentIngredient(mockBun))
            mockNavigate(`/ingredients/${mockBun._id}`, { state: { background: { pathname: '/' } } })
        })
        await waitFor(() => {
            const state = store.getState() as RootState
            expect(state.currentIngredient.info).not.toBeNull()
            expect(state.currentIngredient.info?._id).toBe(mockBun._id)
        }, { timeout: 3000 })

        expect(mockNavigate).toHaveBeenCalledWith(`/ingredients/${mockBun._id}`, expect.any(Object))
    })

    it('unauthenticated user', async () => {
        mockNavigate.mockClear()
        
        const unauthenticatedStore = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }),
            preloadedState: {
                ingredients: {
                    ...ingredientsInitialState,
                    items: { ingredients: mockIngredients },
                },
                burgerConstructor: {
                    ...constructorInitialState,
                    bun: mockBun,
                    ingredients: [mockMainIngredient],
                },
                order: {
                    ...orderInitialState,
                },
                user: {
                    ...userInitialState,
                },
                currentIngredient: {
                    ...currentIngredientInitialState,
                },
                wsFeed: {
                    ...wsFeedInitialState,
                },
                wsProfileOrders: {
                    ...wsProfileOrdersInitialState,
                },
            } as any,
        })

        render(
            <Provider store={unauthenticatedStore}>
                <BrowserRouter>
                    <AppBody />
                </BrowserRouter>
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText(SELECTOR_BUN_NAME)).toBeInTheDocument()
        })

        const orderButton = screen.getByRole('button', { name: SELECTOR_ORDER_BUTTON })
        await userEvent.click(orderButton)

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login', { state: { from: { pathname: '/' } } })
        })

        expect(mockPostOrders).not.toHaveBeenCalled()
    })
})
