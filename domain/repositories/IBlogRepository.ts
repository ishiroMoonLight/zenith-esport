import { Blog } from "../models/Blog";

/**
 * Données nécessaires à la création d'un blog.
 */
export interface CreateBlogInput {
  titre: string;
  description: string;
  contenu: string;
  images?: File[];
}

/**
 * Données pour la mise à jour d'un blog.
 */
export interface UpdateBlogInput {
  titre?: string;
  description?: string;
  contenu?: string;
  images?: File[];
}

/**
 * Contrat d'interface pour le repository Blog (Clean Architecture - Domain).
 * La couche domaine ne dépend d'aucun framework ou bibliothèque HTTP spécifique.
 */
export interface IBlogRepository {
  getAll(): Promise<Blog[]>;
  getById(id: string): Promise<Blog>;
  create(input: CreateBlogInput): Promise<Blog>;
  update(id: string, input: UpdateBlogInput): Promise<Blog>;
  delete(id: string): Promise<void>;
  deleteImage(blogId: string, imageId: string): Promise<void>;
}
