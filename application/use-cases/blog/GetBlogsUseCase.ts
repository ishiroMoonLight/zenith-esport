import { Blog } from "@/domain/models/Blog";
import { IBlogRepository } from "@/domain/repositories/IBlogRepository";

/**
 * Cas d'usage : Récupérer la liste de tous les blogs.
 */
export class GetBlogsUseCase {
  constructor(private readonly blogRepository: IBlogRepository) {}

  async execute(): Promise<Blog[]> {
    return this.blogRepository.getAll();
  }
}
