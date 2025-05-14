import { useEffect, useState } from 'react';
import { fetchWelcomeMessage } from '@/services/welcomeService';

function WelcomePage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWelcomeMessage()
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

export default WelcomePage;
