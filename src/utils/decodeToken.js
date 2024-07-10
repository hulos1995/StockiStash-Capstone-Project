//source https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
//decodes a JWT token to extract user information
export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
