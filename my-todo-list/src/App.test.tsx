import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { store } from './app/store';

test('renders TodoListContainer', () => {
  const queryClient = new QueryClient();

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );

  const addButton = screen.getByText('일정 추가');
  expect(addButton).toBeInTheDocument();
});
