import { IBlogRepository } from "@/domain/repositories/IBlogRepository";

/**
 * Cas d'usage : Supprimer une image spécifique d'un blog.
 */
export class DeleteBlogImageUseCase {
  constructor(private readonly blogRepository: IBlogRepository) {}

  async execute(blogId: string, imageId: string): Promise<void> {
    return this.blogRepository.deleteImage(blogId, imageId);
  }
}
