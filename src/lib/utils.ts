import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

type ClassNameInputs = Parameters<typeof clsx>

export function cn(...inputs: ClassNameInputs) {
  return twMerge(clsx(inputs))
}

export const isIframe = window.self !== window.top;
