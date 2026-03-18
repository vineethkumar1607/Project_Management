let getTokenFn: (() => Promise<string | null>) | null = null;

export const setGetToken = (fn: () => Promise<string | null>) => {
  getTokenFn = fn;
};

export const getToken = async () => {
  if (!getTokenFn) return null;
  return await getTokenFn();
};