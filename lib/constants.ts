export const BRAND_NAME    = "Sworn In USA" as const;
export const BRAND_TAGLINE = "Wear Your Conviction" as const;

export const BRAND_COLORS = {
  black:       "#0A0A0A",
  charcoal:    "#141414",
  orange:      "#E8621A",
  orangeLight: "#FF7A35",
  orangeDark:  "#C4501A",
  silver:      "#D0CFCF",
  navy:        "#1A2035",
  white:       "#F5F2ED",
  red:         "#8B1A1A",
} as const;

export const NAV_LINKS = [
  { label: "Home",     href: "/"                       },
  { label: "Shop Now", href: "/shop"                   },
  { label: "Hats",     href: "/shop?category=headwear" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/swornInUSA",
  tiktok:    "https://tiktok.com/@swornInUSA",
} as const;
