import { useState } from 'react';

export default function useMutation<D extends any>(
  url: string,
): [(data: D) => void, { loading: boolean; data: undefined | any; error: undefined | any }] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data: D) {}
  return [mutation, { loading, data, error }];
}
