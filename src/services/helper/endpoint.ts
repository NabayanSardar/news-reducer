export const Endpoint = {
  auth: {
    login: "/auth/login",
    signup: "/auth/register",
  },
  admin: {
    category: {
      global: "/admin/categories",
      public: "/categories",
    },
    news: {
      global: "/news",
      adminNews: "/admin/news",
      list: "/news",
    },
    users: {
      list: "/admin/users",
      add: "/auth/register",
    },
  },
};
