const domain = 'http://localhost:5000/admin/'
export const environment = {
  user: domain + 'user',
  auth: {
    login: domain + 'auth',
    register: domain + 'auth/signup',
    confirm: domain + 'auth/confirm',
    reset: domain + 'auth/reset/:token',
    forgot: domain + 'auth/forgot',
  },
  categories: domain + 'categories',
  products: domain + 'products'
};
