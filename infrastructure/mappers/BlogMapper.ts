import { Blog, BlogImage } from "@/domain/models/Blog";

/**
 * Format brut de la réponse API backend pour un article.
 */
interface ApiBlogImage {
  id: string;
  url: string;
  blogId?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiBlog {
  id: string;
  titre: string;
  description: string;
  contenu: string;
  images?: ApiBlogImage[];
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Mapper Blog — convertit les DTOs de l'API backend en entités du domaine frontend.
 */
export class BlogMapper {
  /**
   * Transforme un objet brut de l'API en entité Blog du domaine.
   */
  static toDomain(raw: ApiBlog): Blog {
    const images: BlogImage[] = (raw.images ?? [])
      .filter((img) => !img.isDeleted)
      .map((img) => ({
        id: img.id,
        url: img.url,
        isDeleted: img.isDeleted,
      }));

    // Image principale : première image non supprimée
    const firstImageUrl = images.length > 0 ? images[0].url : "";

    // Date lisible
    const date = new Date(raw.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Slug basé sur l'id (l'API utilise id, pas de slug natif)
    const slug = raw.id;

    return {
      // Champs natifs backend
      id: raw.id,
      titre: raw.titre,
      description: raw.description,
      contenu: raw.contenu,
      images,
      isDeleted: raw.isDeleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,

      // Alias de confort UI (compatibilité avec les composants existants)
      title: raw.titre,
      excerpt: raw.description,
      content: raw.contenu,
      date,
      slug,
      image: firstImageUrl,
      category: "Actualité",
    };
  }

  /**
   * Transforme une liste de DTOs en liste d'entités Blog.
   */
  static toDomainList(raws: ApiBlog[]): Blog[] {
    return raws.map(BlogMapper.toDomain);
  }
}
