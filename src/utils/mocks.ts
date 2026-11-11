import { VehicleData } from "../components/CardItems/VehicleCard/VehicleCardDTO";
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

// Veiculos Mock

export const INITIAL_VEHICLES: VehicleData[] = [
  {
    id: "1",
    name: "Dolphin Mini",
    brand: "BYD",
    plate: "ABC1D23",
    image:
      "https://images.pexels.com/photos/10029774/pexels-photo-10029774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];
