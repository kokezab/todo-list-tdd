export async function fetchTodos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return response.json();
}