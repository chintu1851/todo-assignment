import { useEffect, useState } from 'react';
import './App.css';

const App = () =>{
  // State variables for todos, selected userId, and loading state
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState('1');
  const [loading, setLoading] = useState(false); 

  // useEffect hook to fetch todos when userId changes
  useEffect(() => {
     setLoading(true);
    // Fetch todos for the selected user
    fetch(`https://dummyjson.com/todos/user/${userId}`) 
      .then((res) => res.json())
      .then((data) => {
        // Set todos state with fetched data
        setTodos(data.todos);
        // Set loading state to false once todos are fetched
        setLoading(false);
       
      })
      .catch((error) => {
        // Log error if fetch fails and set loading state to false
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  }, [userId]); // Dependency array ensures useEffect runs when userId changes

  // Event handler to update userId when user selects a different option
  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  // JSX rendering
  return (
    <section>
      <header>
        <h1 className='heading'>Todos</h1>
      </header>
      <div>
        {/* Dropdown to select a user */}
        <label htmlFor="user"> Please select a user: </label>
        <select id="user" onChange={handleChange} className='dropdown'>
          <option value="1">Arthur</option>
          <option value="2">Lily</option>
          <option value="3">George</option>
        </select>
      </div>
      <main>
        {/* Conditional rendering based on loading state */}
        {loading ? (
          <p>Data is loading</p>
        ) : (
          // Display todos once data is loaded
          <ul>
            {todos.map((item) => {
              return <li key={item.id}>{item.todo}</li>;
            })}
          </ul>
        )}
      </main>
    </section>
  );
}

export default App;
