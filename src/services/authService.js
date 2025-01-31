// Mock authentication service to prevent frontend errors when backend is unavailable

export const loginUser = async (email, password) => {
  console.log("Login API is currently disabled. Using mock response."); 
  return Promise.resolve({ success: false, message: "Login functionality will be available soon." });
};

export const signupUser = async ({ name, email, password, phone }) => {
  console.log("Signup API is currently disabled. Using mock response."); 
  return Promise.resolve({ success: false, message: "Signup functionality will be available soon." });
};
