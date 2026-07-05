/**
 * Site-wide config. Contact details and the WhatsApp number are read from env
 * where possible so real values are never hard-coded; the fallbacks below are
 * obvious placeholders to replace.
 */
export const SITE = {
  email: "gulcraftstories@gmail.com",
  instagram: "https://instagram.com/gulcraftstories",
  // International format, digits only (no "+"). Replace with the real number,
  // or set NEXT_PUBLIC_WHATSAPP_NUMBER in the environment.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447466397162",
  whatsappMessage: "Hi GulCraft Stories, I have a question about a piece.",
};

export const whatsappLink = () =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

/** Gift voucher amounts offered (GBP). Server validates against this list. */
export const GIFT_DENOMINATIONS = [25, 50, 75, 100] as const;

/** UK orders at or above this (GBP) ship free. Keep in sync with /api/checkout. */
export const FREE_UK_SHIPPING_OVER = 75;
