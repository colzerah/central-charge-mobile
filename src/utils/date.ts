import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const convertDateToStringPTBR = (date: Date) => {
  if (date) {
    return format(date, "dd/MM/yyyy");
  }
  return "";
};

export const convertDateToDayAndMonthShort = (date: Date) => {
  if (date) {
    const formatedDate = format(date, "dd MMM", {
      locale: ptBR,
    });
    return formatedDate.replace(/\b[a-z]/, (char) => char.toUpperCase());
  }
  return "";
};

export const convertHourToStringPTBR = (date: Date) => {
  if (date) {
    return format(date, "HH:mm:ss");
  }
  return "";
};

export const convertHourAndMinute = (date: Date) => {
  if (date) {
    return format(date, "HH:mm");
  }
  return "";
};
