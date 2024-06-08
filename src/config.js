export const BASE_URL = "https://chimp-outgoing-steadily.ngrok-free.app/";
// const BASE_URL = 'http://localhost:3000/';

export function getBearerTokenFromCookies() {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    console.log(key);
    if (key === "auth_token") {
      return `Bearer ${value}`; // Assuming the value is the bearer token
    }
  }

  return null; // Token not found
}

export function getRoleFromCookies() {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === "role") {
      return value;
    }
  }

  return null; // Token not found
}

export function parseErrorMessage(error) {
  let errorMessage = "Signup failed: Network error"; // Default message
  try {
    // Extract the JSON part of the error message
    const parsedError = JSON.parse(error.message.slice(7));

    // Check and extract the specific error message
    if (
      parsedError.message &&
      parsedError.message.email &&
      parsedError.message.email.length > 0
    ) {
      errorMessage = parsedError.message.email[0]; // Extract the first error message for email
    } else {
      errorMessage = "Signup failed: Validation error";
    }
  } catch (e) {
    // Fallback if JSON parsing fails
    errorMessage = error.message || "Signup failed: Network error";
  }
  return errorMessage;
}
