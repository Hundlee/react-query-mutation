import axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [todos, setTodos] = useState([]);

    const handleCLick = async (todoId, completed) => {
        await axios.patch(`http://localhost:8080/todos/${todoId}`, {
            completed,
        });

        const response = await axios.get("http://localhost:8080/todos");

        setTodos(response.data);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/todos")
            .then((res) => setTodos(res.data));
    }, []);

    return (
        <div className="app-container">
            <div className="todos">
                <h2>Todos & React Query</h2>
                {todos.map((todo) => (
                    <div
                        onClick={() => handleCLick(todo.id, !todo.completed)}
                        key={todo.id}
                        className={`todo ${todo.completed && "todo-completed"}`}
                    >
                        {todo.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
