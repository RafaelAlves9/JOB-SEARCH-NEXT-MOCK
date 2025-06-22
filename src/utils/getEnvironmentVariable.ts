type TEnvironmentVariable = 'VITE_API_URL';

export const getEnvironmentVariable = (environment: TEnvironmentVariable) => {
   return typeof Cypress === 'undefined' ? process.env[environment] : Cypress.env(environment);
};
