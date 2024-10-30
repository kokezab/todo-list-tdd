import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {beforeEach, describe, expect, it, Mock, vi} from "vitest";
import {useFetchTodos} from "../../hooks/useFetchTodos/useFetchTodos";
import {screen, render, waitFor} from "@testing-library/react";
import App from "./App";

vi.mock('../../hooks/useFetchTodos/useFetchTodos', () => ({
    useFetchTodos: vi.fn(),
}));

function renderApp() {
    render(
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    );
}

let queryClient: QueryClient;

describe("App", () => {
    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        vi.clearAllMocks();
    });

    it('should show loading indicator', async () => {
        (useFetchTodos as Mock).mockReturnValue({
            isPending: true,
            isError: false
        });

        renderApp();

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should show todos', async () => {
        (useFetchTodos as Mock).mockReturnValue({
            data: [
                {id: 1, title: 'Todo 1'},
                {id: 2, title: 'Todo 2'},
            ],
            isLoading: false,
            isError: false
        });

        renderApp();

        const todo1 = screen.getByText('Todo 1');
        const todo2 = screen.getByText('Todo 2');

        expect(todo1).toBeInTheDocument();
        expect(todo2).toBeInTheDocument();
    });

    it('should show error meesage if isError is true', async () => {
        (useFetchTodos as Mock).mockResolvedValue({
            isError: true
        });

        renderApp();

        waitFor(() => {
            expect(screen.getByText('Error fetching data')).toBeInTheDocument();
        });
    });
});
