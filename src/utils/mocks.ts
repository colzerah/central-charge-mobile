import { VehicleData } from "../components/CardItems/VehicleCard/VehicleCardDTO";
import {
  ChargingStation,
  FavoriteStation,
  SortOption,
  StationHours,
} from "../components/Views/ViewFavorites/ViewFavoritesDTO";
import { MarketsInterface } from "../components/Views/ViewHome/ViewHomeDTO";
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

// Mock Veiculos

export const MOCK_INITIAL_VEHICLES: VehicleData[] = [
  {
    id: "1",
    name: "Dolphin Mini",
    brand: "BYD",
    plate: "ABC1D23",
    image:
      "https://images.pexels.com/photos/10029774/pexels-photo-10029774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];

// Mock Favoritos

export const MOCK_DEFAULT_HOURS: StationHours[] = [
  { day: "Segunda-feira", hours: "08:00 às 22:00" },
  { day: "Terça-feira", hours: "08:00 às 22:00" },
  { day: "Quarta-feira", hours: "08:00 às 22:00" },
  { day: "Quinta-feira", hours: "08:00 às 22:00" },
  { day: "Sexta-feira", hours: "08:00 às 23:00" },
  { day: "Sábado", hours: "09:00 às 23:00" },
  { day: "Domingo", hours: "09:00 às 20:00" },
];

export const MOCK_STATIONS: ChargingStation[] = [
  {
    id: "1",
    name: "Estação Centro",
    x: 0.32,
    y: 0.28,
    status: "available",
    power: 150,
    distance: 0.8,
    price: 0.89,
    address: "Ceilândia Sul, QNN 15, Conjunto D, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 150 },
      { id: "p2", standard: "ISO 168", type: "Type 2", power: 22 },
    ],
    hours: MOCK_DEFAULT_HOURS,
  },
  {
    id: "2",
    name: "Estação Norte",
    x: 0.62,
    y: 0.22,
    status: "busy",
    power: 350,
    distance: 2.4,
    price: 0.79,
    address: "Taguatinga Norte, QNB 08, Área Especial 2, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 350 },
      { id: "p2", standard: "ISO 168", type: "CHAdeMO", power: 100 },
    ],
    hours: MOCK_DEFAULT_HOURS,
  },
  {
    id: "3",
    name: "Estação Shopping",
    x: 0.48,
    y: 0.52,
    status: "available",
    power: 250,
    distance: 1.5,
    price: 0.92,
    address: "Setor Comercial Sul, EQ 8/12, Asa Sul, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 250 },
      { id: "p2", standard: "ISO 168", type: "Type 2", power: 43 },
    ],
    hours: MOCK_DEFAULT_HOURS,
  },
  {
    id: "4",
    name: "Estação Sul",
    x: 0.22,
    y: 0.68,
    status: "offline",
    power: 120,
    distance: 3.1,
    price: 0.85,
    address: "Gama Sul, QE 38, Área Especial, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [{ id: "p1", standard: "ISO 167", type: "CCS2", power: 120 }],
    hours: MOCK_DEFAULT_HOURS,
  },
  {
    id: "5",
    name: "Estação Praça",
    x: 0.76,
    y: 0.62,
    status: "available",
    power: 350,
    distance: 2.8,
    price: 0.75,
    address: "Águas Claras, Avenida Castanheira, Q 400, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 350 },
      { id: "p2", standard: "ISO 168", type: "Type 2", power: 22 },
    ],
    hours: MOCK_DEFAULT_HOURS,
  },
  {
    id: "6",
    name: "Estação Parque",
    x: 0.4,
    y: 0.8,
    status: "busy",
    power: 150,
    distance: 4.2,
    price: 0.88,
    address: "Sobradinho, EQ 12/16, Área Especial, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 150 },
      { id: "p2", standard: "ISO 168", type: "CHAdeMO", power: 50 },
    ],
    hours: MOCK_DEFAULT_HOURS,
  },
  {
    id: "7",
    name: "Estação Aeroporto",
    x: 0.85,
    y: 0.38,
    status: "available",
    power: 250,
    distance: 5.5,
    price: 0.95,
    address: "Lago Sul, SHIS QI 19, Via Aeroporto, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 250 },
      { id: "p2", standard: "ISO 168", type: "Type 2", power: 43 },
    ],
    hours: MOCK_DEFAULT_HOURS,
  },
];

export const MOCK_INITIAL_FAVORITES: FavoriteStation[] = [
  { station: MOCK_STATIONS[0], savedAt: "Adicionado em 10 Ago" },
  { station: MOCK_STATIONS[2], savedAt: "Adicionado em 08 Ago" },
  { station: MOCK_STATIONS[4], savedAt: "Adicionado em 05 Ago" },
];

export const MOCK_SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Recentes" },
  { value: "nearest", label: "Mais perto" },
];

// Mock Home

export const MOCK_INITIAL_REGION = {
  latitude: -15.832652,
  longitude: -48.110097,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export const MOCK_MARKETS = [
  {
    id: 1,
    name: "Post Ipiranga · Ceilândia",
    adress: "QNN 22, Ceilândia Sul",
    variant: "BROKEN",
    r$kwh: 0.23,
    kwhmax: 110,
    supportNumber: "0800 500 5000",
    qtdPlugs: 2,
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
    ],
    coordinate: {
      latitude: -15.829452,
      longitude: -48.107312,
    },
    plugs: [
      {
        id: 1,
        titleSmall: "TESLA-S",
        title: "ISO 8000",
        plugName: "TESLA-S",
        status: "BROKEN",
        kw: 20,
      },
      {
        id: 2,
        titleSmall: "TESLA-S",
        title: "ISO 8000",
        plugName: "TESLA-S",
        status: "BROKEN",
        kw: 30,
      },
    ],
  },
  {
    id: 2,
    name: "Dia a Dia · Ceilândia",
    adress: "QNM 14, Ceilândia Norte",
    distance: "1.2",
    qndPlugs: 1,
    variant: "AVAILABLE",
    r$kwh: 0.43,
    kwhmax: 120,
    supportNumber: "0800 501 5001",
    coordinate: {
      latitude: -15.836911,
      longitude: -48.113987,
    },
    qtdPlugs: 1,
    plugs: [
      {
        id: 1,
        titleSmall: "CSS",
        title: "ISO 167",
        plugName: "CSS",
        status: "AVAILABLE",
        kw: 30,
      },
    ],
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
    ],
  },
  {
    id: 3,
    name: "Post do Balaio - Taguatinga",
    adress: "QNL 20, Taguatinga Norte",
    variant: "OCCUPIED",
    coordinate: {
      latitude: -15.831204,
      longitude: -48.116842,
    },
    r$kwh: 0.63,
    kwhmax: 140,
    supportNumber: "0800 502 5002",
    qtdPlugs: 1,
    plugs: [
      {
        id: 1,
        titleSmall: "TYP1",
        title: "ISO 167",
        plugName: "TYP1",
        status: "OCCUPIED",
        kw: 40,
      },
    ],
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
    ],
  },
  {
    id: 4,
    name: "Post da Zona Leste",
    adress: "QD 100, Val paraiso",
    variant: "AVAILABLE",
    r$kwh: 0.83,
    kwhmax: 180,
    supportNumber: "0800 503 5003",
    coordinate: {
      latitude: -15.838426,
      longitude: -48.104615,
    },
    qtdPlugs: 2,
    plugs: [
      {
        id: 1,
        titleSmall: "TYP2",
        title: "ISO 167",
        plugName: "TYP2",
        status: "OCCUPIED",
        kw: 44,
      },
      {
        id: 2,
        titleSmall: "TYP2",
        title: "ISO 167",
        plugName: "TYP2",
        status: "AVAILABLE",
        kw: 48,
      },
    ],
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
    ],
  },
  {
    id: 5,
    name: "EasyCharge · Ceilândia",
    adress: "QNN 10, Ceilândia Centro",
    variant: "AVAILABLE",
    // mesma logo da EasyCharge usada no filtro (ViewFilter)
    image:
      "https://cdn.aptoide.com/imgs/a/8/d/a8dd37571f8e05e9a1e2da4be769e6a0_icon.png",
    r$kwh: 0.55,
    kwhmax: 150,
    supportNumber: "0800 504 5004",
    coordinate: {
      latitude: -15.834118,
      longitude: -48.109284,
    },
    qtdPlugs: 1,
    plugs: [
      {
        id: 1,
        titleSmall: "CCS2",
        title: "ISO 167",
        plugName: "CCS2",
        status: "AVAILABLE",
        kw: 60,
      },
    ],
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
    ],
  },
] as MarketsInterface[];
