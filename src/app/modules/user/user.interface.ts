export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T; //type generic (any type data)
};
