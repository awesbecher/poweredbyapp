
// Define a type for authorized users with email and password
type AuthorizedUser = {
  email: string;
  password: string;
};

// Define the return type for the authentication function
type AuthResult = {
  success: boolean;
  errorType?: 'user_not_found' | 'invalid_password' | 'unknown_error';
  message?: string;
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
 * Returns detailed information about authentication success or failure
 */
export const authenticateUser = (email: string, password: string): Promise<AuthResult> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const user = findAuthorizedUser(email);
      
      if (!user) {
        resolve({
          success: false,
          errorType: 'user_not_found',
          message: 'User with this email was not found'
        });
        return;
      }
      
      if (user.password !== password) {
        resolve({
          success: false,
          errorType: 'invalid_password',
          message: 'Incorrect password'
        });
        return;
      }
      
      resolve({
        success: true,
        message: 'Authentication successful'
      });
    }, 800);
  });
};
