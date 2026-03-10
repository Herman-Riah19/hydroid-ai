export const headersAuthFetch = (token: string) => {
  return {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
    },
  };
};
