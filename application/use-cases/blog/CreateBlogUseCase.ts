import { Blog } from "@/domain/models/Blog";
import { IBlogRepository, CreateBlogInput } from "@/domain/repositories/IBlogRepository";

/**
 * Cas d'usage : Créer un nouveau blog avec images optionnelles.
 */
export class CreateBlogUseCase {
  constructor(private readonly blogRepository: IBlogRepository) {}

  async execute(input: CreateBlogInput): Promise<Blog> {
    return this.blogRepository.create(input);
  }
}
