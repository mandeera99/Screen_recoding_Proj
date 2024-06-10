import { useEffect } from 'react';
import { useLog } from '../context/LogProvider';

const useNetworkLogger = () => {
  const logContext = useLog();

  useEffect(() => {
    if (!logContext) {
      console.error('useNetworkLogger must be used within a LogProvider');
      return;
    }

    const { logEvent } = logContext;

    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      logEvent({ type: 'network', url: args[0], status: response.status });
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [logContext]);
};

export default useNetworkLogger;
