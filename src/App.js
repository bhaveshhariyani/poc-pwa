import * as React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [userId, setUserId] = React.useState('');
  const [cachedUserId, setCachedUserId] = React.useState();


  const cacheUserId = async () => {
    const cache = await caches.open('my-cache'); // Replace with your cache name
    console.log("Cache - ", cache, userId);
    const response = new Response(userId, {
      headers: { 'Content-Type': 'text/plain' },
    });
    await cache.put('/user-id', response); // Cache the user ID with a specific key
    setUserId('');
  };


  const retrieveUserId = async () => {
    const cache = await caches.open('my-cache'); // Replace with your cache name
    const cachedResponse = await cache.match('/user-id'); // Retrieve the user ID by key
    if (cachedResponse) {
      const userId = await cachedResponse.text();
      console.log("User id - ", userId);
      setCachedUserId(userId);
      return userId;
    } else {
      setCachedUserId('User ID not found in cache.');
      return 'User ID not found in cache.';
    }
  };

  React.useEffect(() => {
    retrieveUserId();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>User ID Storage</h1>
        {
          (cachedUserId === "" || cachedUserId === "User ID not found in cache.") && (
            <>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
              />
              <button onClick={cacheUserId}>Cache User ID</button>
              <button onClick={retrieveUserId}>Retrieve Cached User ID</button>
            </>
          )
        }
        <p>Cached User ID: {cachedUserId}</p>
      </div>
    </div>
  );
}

export default App;
