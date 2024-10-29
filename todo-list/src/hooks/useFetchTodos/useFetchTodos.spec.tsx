import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchTodos } from './useFetchTodos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchTodos } from '../../api/todosService/fetchTodos/fetchTodos';

vi.mock('../../api/todosService/fetchTodos/fetchTodos', () => ({
    fetchTodos: vi.fn(),
}));

function renderUseFetchTodosHook() {
    return renderHook(useFetchTodos, {
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        ),
    });
}

let queryClient: QueryClient;

describe("useFetchTodos", () => {
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

    it('should have the correct initial state', () => {
        // arrange and act
        const { result } = renderUseFetchTodosHook();
        const { data, isError, isPending } = result.current;

        // assert
        expect(data).toBe(undefined);
        expect(isError).toBe(false);
        expect(isPending).toBe(true);
    });

    it("should return fetched todos as data, isError as false and isPending as false", async () => {
        // arrange
        (fetchTodos as Mock).mockResolvedValue([
            { id: 1, title: "Todo 1", completed: false },
            { id: 2, title: "Todo 2", completed: true },
        ]);

        // act
        const { result } = renderUseFetchTodosHook();

        // assert
        await waitFor(() => {
            expect(result.current.data).toEqual([
                { id: 1, title: "Todo 1", completed: false },
                { id: 2, title: "Todo 2", completed: true },
            ]);
            expect(result.current.isError).toBe(false);
            expect(result.current.isPending).toBe(false);
        });
    });
    
});
