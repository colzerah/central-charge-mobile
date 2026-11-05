import { api } from "../api";

interface requestLoginParams {
  email: string;
  password: string;
}

export interface RequestLoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: null;
      created_at: string;
      updated_at: string;
    };
  };
}

export interface RequestLoginMeResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  };
}

export interface UserRegisterParams {
  name: string;
  email: string;
  telefone: string;
  password: string;
  foto?: {
    uri: string;
    name: string;
    type: string;
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

export const requestRegister = async ({
  name,
  email,
  telefone,
  password,
  foto,
}: UserRegisterParams): Promise<void> => {
  await api.post(
    "/auth/register",
    {
      name,
      email,
      telefone,
      password,
      foto,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  console.log("Res Register", { name, email, telefone, password, foto });
};
