
// Define a type for authorized users with email and password
type AuthorizedUser = {
  email: string;
  password: string;
};

// List of authorized users with their credentials
const AUTHORIZED_USERS: AuthorizedUser[] = [
  {
    email: 'andrew@poweredby.agency',
    password: 'password123' // You should use a stronger password in production
  },
  {
    email: 'team@poweredby.agency',
    password: 'teamaccess'  // You should use a stronger password in production
  },
  {
    email: 'andrew@madrone.capital',
    password: 'securepass'  // You should use a stronger password in production
  },
  // Add more authorized users as needed
];

/**
 * Checks if the provided email is in the whitelist of authorized users
 */
export const isAuthorizedUser = (email: string): boolean => {
  return AUTHORIZED_USERS.some(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Find an authorized user by email
 */
export const findAuthorizedUser = (email: string): AuthorizedUser | undefined => {
  return AUTHORIZED_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Authenticates a user with the provided credentials
 * Checks both email and password
 */
export const authenticateUser = (email: string, password: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const user = findAuthorizedUser(email);
      // Verify both email exists and password matches
      const isAuthenticated = user !== undefined && user.password === password;
      resolve(isAuthenticated);
    }, 800);
  });
};
