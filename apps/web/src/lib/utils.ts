import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateAddress = (address?: string | null, length?: number) => {
  if (!address) return "";
  return `${address.slice(0, length || 6)}...${address.slice(-4)}`;
};
