import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[]
}

const initialState: TodoState = {
    todos: [],
}

export const todoReducer = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload)
        },
        updatedTodo: (state, action: PayloadAction<Todo>) => {
            const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (todoIndex !== -1) {
                state.todos[todoIndex] = action.payload
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const todoIndex = state.todos.findIndex(todo => todo.id === action.payload);
            if (todoIndex !== -1) {
                state.todos.splice(todoIndex, 1);
            }
        },
    }
});

export const { setTodos, addTodo, updatedTodo, deleteTodo } = todoReducer.actions;

export default todoReducer.reducer;
