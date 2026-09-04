import { Blog } from "@/domain/models/Blog";
import { IBlogRepository, UpdateBlogInput } from "@/domain/repositories/IBlogRepository";

/**
 * Cas d'usage : Mettre à jour un blog existant.
 */
export class UpdateBlogUseCase {
  constructor(private readonly blogRepository: IBlogRepository) {}

  async execute(id: string, input: UpdateBlogInput): Promise<Blog> {
    return this.blogRepository.update(id, input);
  }
}
