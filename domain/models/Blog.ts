/**
 * Image associée à un article de blog.
 */
export interface BlogImage {
  id: string;
  url: string;
  isDeleted?: boolean;
}

/**
 * Entité métier Blog (Clean Architecture - Domain).
 * Contient les données brutes issues du backend et les propriétés de confort UI.
 */
export interface Blog {
  // Champs natifs backend
  id: string;
  titre: string;
  description: string;
  contenu: string;
  images: BlogImage[];
  isDeleted?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;

  // Propriétés de confort UI (compatibilité & affichage)
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  image: string;
  category: string;
}
