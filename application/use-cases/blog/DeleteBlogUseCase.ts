import { IBlogRepository } from "@/domain/repositories/IBlogRepository";

/**
 * Cas d'usage : Supprimer un blog par son identifiant.
 */
export class DeleteBlogUseCase {
  constructor(private readonly blogRepository: IBlogRepository) {}

  async execute(id: string): Promise<void> {
    return this.blogRepository.delete(id);
  }
}
