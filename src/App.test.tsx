import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/rootReducer';
import App from './app/App';

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
});

jest.mock('react-dnd-html5-backend', () => ({
    HTML5Backend: jest.fn(),
}));

jest.mock('./store/middleware/socketMiddleware', () => ({
    socketMiddleware: () => (next: any) => (action: any) => {
        if (typeof next === 'function') {
            return next(action);
        }
        return action;
    },
}));

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-unique-id'),
}));

jest.mock('react-router-dom', () => {
    const React = require('react');
    return {
        BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
        Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
        Route: ({ element }: { element?: React.ReactNode }) => <>{element}</>,
        useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
        useNavigate: () => jest.fn(),
        useParams: () => ({}),
        Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
        NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
        Outlet: () => null,
        Navigate: ({ to }: { to: string }) => <div>Navigate to {to}</div>,
    };
});

test('renders app header', () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  } as any);

  const modalsContainer = document.createElement('div');
  modalsContainer.setAttribute('id', 'modals');
  document.body.appendChild(modalsContainer);

  const { BrowserRouter } = require('react-router-dom');
  
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const header = document.querySelector('header');
  expect(header).toBeInTheDocument();

  if (modalsContainer.parentNode) {
    modalsContainer.parentNode.removeChild(modalsContainer);
  }
});
