import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkSession } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    
    const verifySession = async () => {
      try {
        await checkSession();
        if (isMounted) setIsLoading(false);
      } catch (error) {
        if (isMounted) {
          navigate('/login', {
            state: { from: location },
            replace: true
          });
        }
      }
    };

    verifySession();
    
    return () => {
      isMounted = false;
    };
  }, [navigate, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;