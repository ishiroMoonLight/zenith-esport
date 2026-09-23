/**
 * Configuration globale SEO et métadonnées pour Zenith E-Sport.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://zenith-esport.vercel.app");

export const siteConfig = {
  name: "Zenith E-Sport",
  shortName: "Zenith",
  title: "Zenith E-Sport | Équipe Tekken d'Élite & Compétitions E-Sport",
  description:
    "Zenith E-Sport est l'équipe esport de référence sur Tekken à Madagascar. Découvrez notre roster de joueurs d'élite, notre actualité, nos vidéos et nos résultats de tournois.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/zenith/logo.jpg`,
  locale: "fr_FR",
  links: {
    tiktok: "https://www.tiktok.com/@zenith_e.sport",
    facebook: "https://www.facebook.com/profile.php?id=100071631273678",
    instagram: "https://www.instagram.com/zenith_e.sport",
    discord: "https://discord.com",
  },
  keywords: [
    "Zenith E-Sport",
    "Zenith Esport",
    "Zenith",
    "Tekken Madagascar",
    "Tekken 8 Madagascar",
    "Équipe Tekken",
    "Team Tekken",
    "Esport Madagascar",
    "E-sport Madagascar",
    "Gaming Madagascar",
    "Roster Zenith",
    "Compétition Tekken",
    "Tournoi Tekken",
    "Tournoi jeu de combat",
    "FGC Madagascar",
    "Fighting Game Community",
    "Jeux de combat Madagascar",
    "Pro players Tekken",
    "Zenith Rising",
    "Kazuya Mishima",
    "Tekken World Tour",
  ],
  authors: [
    {
      name: "Zenith E-Sport",
      url: SITE_URL,
    },
  ],
  creator: "Zenith E-Sport",
  publisher: "Zenith E-Sport",
};
