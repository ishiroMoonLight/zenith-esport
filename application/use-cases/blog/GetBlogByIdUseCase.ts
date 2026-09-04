import { Blog } from "@/domain/models/Blog";
import { IBlogRepository } from "@/domain/repositories/IBlogRepository";

/**
 * Cas d'usage : Récupérer un blog par son identifiant.
 */
export class GetBlogByIdUseCase {
  constructor(private readonly blogRepository: IBlogRepository) {}

  async execute(id: string): Promise<Blog> {
    return this.blogRepository.getById(id);
  }
}
