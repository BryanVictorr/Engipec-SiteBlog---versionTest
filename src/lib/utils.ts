import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateExtended(dateStr: string) {
  const [day, month, year] = dateStr.split('/');
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  return `${day} de ${months[parseInt(month) - 1]} de ${year}`;
}

export function formatDateCompact(dateStr: string) {
  return dateStr; // Já está no formato DD/MM/YYYY
}

export function formatPhoneNumber(value: string): string {
  // Remove tudo que não for número
  const numbers = value.replace(/\D/g, "");
  
  // Aplica a formatação
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
}

export function unformatPhoneNumber(value: string): string {
  return value.replace(/\D/g, "");
}
