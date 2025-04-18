import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://localhost:7153/api/welcome') // Use http://localhost:5119
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(() => {
        setMessage('Failed to load message.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="text-center mt-10 text-2xl">
      {loading ? 'Loading...' : message}
    </div>
  );
}

export default App;
