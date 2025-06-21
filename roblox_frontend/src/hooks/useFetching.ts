import { useState } from 'react';

type FetchCallback = () => void;

type UseFetchingResult = [() => Promise<void>, boolean, string];

export const useFetching = (callback: FetchCallback): UseFetchingResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Произошла неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
