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

export type Tag = {
  id: string;
  name: string;
};

type TimestampTz = string | Date;

export type Post = {
  id: string;
  title: string;
  pub_date: TimestampTz;
  image: string;
  author: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
};

export type Saint = {
  id: string;
  name: string;
  pub_date: TimestampTz;
  feast_day: TimestampTz;
  author: string;
  image: string;
  slug: string;
  description: string;
  content: string;
  user_id: string;
};
