import { api } from "../api";

interface requestLoginParams {
  email: string;
  password: string;
}

interface RequestLoginResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: null;
      created_at: Date;
      updated_at: Date;
    };
  };
}

interface RequestLoginMeResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    created_at: Date;
  };
}

export const requestLogin = async ({
  email,
  password,
}: requestLoginParams): Promise<RequestLoginResponse> => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const requestLogout = async () => {
  const response = await api.post("/auth/logout");
  console.log("RES Logout", response);
};

export const requestLoginMe = async (): Promise<RequestLoginMeResponse> => {
  const response = await api.get("/auth/me");
  return response.data;
};
