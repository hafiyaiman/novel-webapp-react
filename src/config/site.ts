export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Novelify",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Favorites",
      href: "/favorites",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Favorites",
      href: "/favorites",
    },
    {
      label: isAuthenticate() ? "Logout" : "Login",
      href: isAuthenticate() ? "/logout" : "/signin",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

function isAuthenticate() {
  return !!localStorage.getItem("token");
}

