import React, { useState } from 'react'
import { useTodo } from '../Contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("");

    //we only want addTodo method from the context-
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if(!todo) return;
        //we are passing object over here-
        addTodo({todo, completed:false});
        setTodo("");
    }
    return (
        <form onSubmit={add} className='flex gap-2'>
            <input type="text"
                placeholder='Write Todo . . . . . .'
                value={todo}
                onChange={(e)=>{setTodo(e.target.value)}}
                className='w-full border-black/10 rounded-lg px-3 outline-none 
        duration-150 py-3 bg-[#000000ed] font-sans font-medium text-xl'/>

            <button type='submit' className='rounded-r-lg px-3 py-1 bg-green-600
        text-white font-semibold text-xl duration-300 hover:bg-green-700 hover:font-semibold
        focus:ring-4 focus:ring-purple-950 '>
                Add
            </button>
        </form>
    )
}

export default TodoForm