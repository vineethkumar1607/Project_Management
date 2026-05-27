let getTokenFn: (() => Promise<string | null>) | null = null;

let authInitialized = false;

export const setGetToken = (
  fn: () => Promise<string | null>
) => {
  getTokenFn = fn;
  authInitialized = true;
};

export const getToken = async () => {
  if (!getTokenFn) {
    console.warn(
      "Token function not initialized"
    );

    return null;
  }

  return await getTokenFn();
};

export const isAuthInitialized = () => {
  return authInitialized;
};