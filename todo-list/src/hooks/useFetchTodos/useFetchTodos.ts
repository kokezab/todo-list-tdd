import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../../api/todosService/fetchTodos/fetchTodos";

export function useFetchTodos() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })
}