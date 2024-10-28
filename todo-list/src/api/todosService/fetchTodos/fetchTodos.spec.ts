import {describe, expect, it, beforeAll, afterAll, afterEach} from "vitest";

// import the fetchTodos function
import {fetchTodos} from "./fetchTodos";

// setup msw server
import {http, HttpResponse} from "msw";
import {setupServer} from "msw/node";

const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("fetchTodos", () => {
    it("should fetch todos", async () => {
        // arrange - mock the response
        server.use(
            http.get("https://jsonplaceholder.typicode.com/todos", () => {
                return HttpResponse.json([
                    {id: 1, title: "Todo 1", completed: false},
                    {id: 2, title: "Todo 2", completed: true},
                ]);
            })
        );
        // act
        const todos = await fetchTodos();
        // assert
        expect(todos).toEqual([
            {id: 1, title: "Todo 1", completed: false},
            {id: 2, title: "Todo 2", completed: true},
        ]);
    });

    it("should handle network error", async () => {
        // arrange - mock api to return error
        server.use(
            http.get("https://jsonplaceholder.typicode.com/todos", () => {
                return HttpResponse.error();
            })
        );
        // act and assert
        expect(fetchTodos()).rejects.toThrow();
    });
});
