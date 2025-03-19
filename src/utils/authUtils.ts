
// List of authorized email addresses
const AUTHORIZED_EMAILS = [
  'admin@example.com',
  'user1@example.com',
  'user2@example.com',
  // Add more authorized emails as needed
];

/**
 * Checks if the provided email is in the whitelist of authorized users
 */
export const isAuthorizedUser = (email: string): boolean => {
  return AUTHORIZED_EMAILS.includes(email.toLowerCase());
};

/**
 * Simulates an authentication check with the provided credentials
 * Only allows login for whitelisted email addresses
 */
export const authenticateUser = (email: string, password: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // In a real app, you'd validate the password here as well
      // For this demo, we're only checking if the email is authorized
      const isAuthorized = isAuthorizedUser(email);
      resolve(isAuthorized);
    }, 800);
  });
};
