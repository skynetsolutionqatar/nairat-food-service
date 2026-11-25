/** Builds a WhatsApp click-to-chat link from a formatted phone number. */
export function whatsappChatUrl(phone: string, message?: string): string {
  const url = new URL(`https://wa.me/${phone.replace(/\D/g, '')}`);
  if (message) url.searchParams.set('text', message);
  return url.toString();
}
