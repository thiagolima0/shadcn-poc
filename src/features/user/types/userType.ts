export type UserData = {
  name?: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  id: number;
  createdAt: string;
};

export type UserParams = {
  per_page?: number;
  page?: number;
  total?: number;
  total_pages?: number;
  delay?: number;
};

export type UserResponse = UserParams & UserApi;

export type UserApi = {
  data?: UserData[];
};
