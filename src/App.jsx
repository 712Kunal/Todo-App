import { useState, useEffect } from 'react'
import { TodoProvider } from './Contexts/TodoContext';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';

function App() {
  // todos=Array of todo and settodos is the function
  const [todos, settodos] = useState([]);


  //Definitions of all the methods-
  const addTodo = (todo) => {

    settodos((prev) => [{ id: Date.now(), ...todo }, ...prev] );
    //[{ id: Date.now(), ...todo }, ...prev]: This line creates a new array of todos.

    // id: Date.now(): It assigns a unique ID to the todo item by using the Date.now()
    // function, which gives the current timestamp.

    // ...todo: This spreads all the properties of the todo object into this new todo object.
    // So, if todo has properties like name, description, etc., they will be included here.

    // ...prev: This part spreads all the previous todos into the new array. This ensures
    // that the new todo is added at the beginning of the list, maintaining the order
    // of the existing todos.

  }

  const deleteTodo = (id) => {
    settodos((prev) => {
    return prev.filter(
        (singletodo) => {
        return singletodo.id !== id; //If this condition holds true, then the newly created array contains the todos which id is not equal to the given id in the function
        }
      )
    });

    //Filter is the method that operates on an array used to create a new array containing
    //only the elements of the original array that meet a certain condition. 
  }

  const updateTodo = (todo, id) => {
    settodos((prev) => {
    return prev.map((singleprevtodo) => {
        if (singleprevtodo.id === id) {
        return  todo;
        } else {
        return singleprevtodo;
        }
      })
    });
  }

  const toggleComplete = (id) => {
    settodos((prev) => {
    return prev.map(
        (SingleTodo) => {
        return (SingleTodo.id === id ? { ...SingleTodo, completed: !SingleTodo.completed } : SingleTodo)
        }
      )
    });
  }


  useEffect(() => {
    localStorage.setItem("todoes", JSON.stringify(todos));
  }, [todos])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todoes"));
    if (todos && todos.length > 0) {
      settodos(todos);
    }
  }, [])

  return (
    <TodoProvider value={{ todos, updateTodo, addTodo, deleteTodo, toggleComplete }}>
      <div className='bg-[#0a121f] min-h-screen py-8'>
        <div className='w-full max-w-2xl bg-white mx-auto shadow-md rounded-lg px-4
    py-3 text-white'>
          <h1 className='text-4xl font-bold text-center mb-8 mt-2 text-purple-950'>Manage Your Todo's</h1>
          <div className='mb-4'>
            <TodoForm />
          </div>
          <div className='flex flex-wrap gap-y-4'>
            {todos.map((todo)=>
              (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>)
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
