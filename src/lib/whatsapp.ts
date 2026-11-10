import { STORE } from '../config';

export function whatsappLink(message: string): string {
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
