export type NavLink = {
  text: string;
  url: string;
  children?: NavLink[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};
