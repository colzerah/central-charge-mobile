export interface TimeTablePros {
  items: TimeTableItemProps[];
}

export interface TimeTableItemProps {
  days:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  hours?: string;
}
