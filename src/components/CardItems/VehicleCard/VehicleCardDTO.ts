export interface VehicleData {
  id: string;
  name: string;
  brand: string;
  plate: string;
  image: string;
}

export interface VehicleCardProps {
  vehicle: VehicleData;
  onDelete: () => void;
}
