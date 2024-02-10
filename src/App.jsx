import axios from "axios";
import { useQuery } from "react-query";

function App() {
    const { data, isLoading } = useQuery(
        "todos",
        () => {
            return axios
                .get("http://localhost:8080/todos")
                .then((response) => response.data);
        },
        {
            retry: 4,
            refetchOnWindowFocus: true,
            refetchInterval: 5000,
        }
    );

    if (isLoading) {
        return <div className="loading">Carregando...</div>;
    }
    return (
        <div className="app-container">
            <div className="todos">
                <h2>Todos & React Query</h2>
                {data.map((todo) => (
                    <div
                        className={`todo ${todo.completed && "todo-completed"}`}
                        key={todo.id}
                    >
                        {todo.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
