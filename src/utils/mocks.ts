import {
  RequestLoginMeResponse,
  RequestLoginResponse,
} from "../service/requests/authRequests";

export const userMock: RequestLoginResponse = {
  success: true,
  message: "Login realizado com sucesso",
  data: {
    token: "mock_token",
    user: {
      id: 1,
      name: "João Mock",
      email: "joaomock@gmail.com",
      email_verified_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
};

export const userMeMock: RequestLoginMeResponse = {
  success: true,
  message: "Dados do usuário recuperados com sucesso",
  data: {
    id: 1,
    name: "João Mock",
    email: "joaomock@gmail.com",
    created_at: new Date().toISOString(),
  },
};
