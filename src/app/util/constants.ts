// App Constants
export const PHONE_NUMBER = "9858061927";
export const WHATSAPP_NUMBER = "9858061927";

// Helper functions
export const getWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const getTelUrl = (phoneNumber?: string): string => {
  return `tel:${phoneNumber || PHONE_NUMBER}`;
};

