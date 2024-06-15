import React from 'react'
import { useTodo } from '../Contexts/TodoContext';
import { useState } from 'react';

function TodoItem({ todo }) {

    const [isTodoEditable, setisTodoEditable] = useState(false);
    const [todoMsg, settodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    //Now we have to make the edit method to edit the todo-
    const editTodo = () => {
        // updateTodo take the id and the todo message which want to update
        updateTodo(todo.id, {...todo, todo: todoMsg });
        setisTodoEditable(false);
    }

    //Now we have to make the toggle status-
    const toggleCompleted=()=>{
        toggleComplete(todo.id);
    }

    return (
        <div
            className={`flex border font-serif text-xl border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-500  text-black ${todo.completed ? "bg-[#568582]" : "bg-[#9f6ac7]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => settodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setisTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
