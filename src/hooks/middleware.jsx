export const middlewareF = (apis) => (getDefaultMiddleware) => {
  const combinedMiddleware = apis.reduce((acc, api) => acc.concat(api.middleware), []);
  return getDefaultMiddleware().concat(combinedMiddleware);
};
