export const PHONE_DIGITS = 11;

export const onlyDigits = (text: string) => text.replace(/\D/g, "");

// Máscara de celular: (11) 99999-9999
export const formatPhone = (text: string): string => {
  const digits = onlyDigits(text).slice(0, PHONE_DIGITS);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};
