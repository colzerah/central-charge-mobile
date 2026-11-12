export const isValidCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "");

  // CPF precisa ter 11 dígitos
  if (digits.length !== 11) return false;

  // Rejeita sequências repetidas (111..., 222..., etc.)
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calculateDigit = (base: string, factor: number) => {
    let total = 0;

    for (const digit of base) {
      total += Number(digit) * factor--;
    }

    const remainder = total % 11;

    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(digits.slice(0, 9), 10);

  const secondDigit = calculateDigit(digits.slice(0, 9) + firstDigit, 11);

  return Number(digits[9]) === firstDigit && Number(digits[10]) === secondDigit;
};
