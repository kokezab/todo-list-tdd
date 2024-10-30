import { useFetchTodos } from "../../hooks/useFetchTodos/useFetchTodos";

export default function App() {
    const { isError, isPending, data } = useFetchTodos();

    if (isError) {
        return <div>Error fetching data</div>
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    return <ul>
        {data?.map(todo => (
            <li key={todo.id}>{todo.title}</li>
        ))}
    </ul>
}
