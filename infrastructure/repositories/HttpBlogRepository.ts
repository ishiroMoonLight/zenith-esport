import { Blog } from "@/domain/models/Blog";
import { IBlogRepository, CreateBlogInput, UpdateBlogInput } from "@/domain/repositories/IBlogRepository";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { BlogMapper } from "@/infrastructure/mappers/BlogMapper";
import { API_ROUTES } from "@/infrastructure/config/apiConfig";

/**
 * Format de la réponse API enveloppée dans { success, data, total }.
 */
interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  total?: number;
}
interface ApiSingleResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Implémentation HTTP concrète du repository Blog.
 * Cette classe est la seule qui connaît le backend Express/TSOA.
 */
export class HttpBlogRepository implements IBlogRepository {
  private readonly client: HttpClient;

  constructor() {
    this.client = new HttpClient();
  }

  async getAll(): Promise<Blog[]> {
    const res = await this.client.get<ApiListResponse<unknown>>(API_ROUTES.blogs);
    return BlogMapper.toDomainList(res.data as Parameters<typeof BlogMapper.toDomainList>[0]);
  }

  async getById(id: string): Promise<Blog> {
    const res = await this.client.get<ApiSingleResponse<unknown>>(
      `${API_ROUTES.blogs}/${id}`
    );
    return BlogMapper.toDomain(res.data as Parameters<typeof BlogMapper.toDomain>[0]);
  }

  async create(input: CreateBlogInput): Promise<Blog> {
    const formData = new FormData();
    formData.append("titre", input.titre);
    formData.append("description", input.description);
    formData.append("contenu", input.contenu);
    if (input.images) {
      input.images.forEach((file) => formData.append("images", file));
    }

    const res = await this.client.postFormData<ApiSingleResponse<unknown>>(
      API_ROUTES.blogs,
      formData
    );
    return BlogMapper.toDomain(res.data as Parameters<typeof BlogMapper.toDomain>[0]);
  }

  async update(id: string, input: UpdateBlogInput): Promise<Blog> {
    const formData = new FormData();
    if (input.titre !== undefined) formData.append("titre", input.titre);
    if (input.description !== undefined) formData.append("description", input.description);
    if (input.contenu !== undefined) formData.append("contenu", input.contenu);
    if (input.images) {
      input.images.forEach((file) => formData.append("images", file));
    }

    const res = await this.client.putFormData<ApiSingleResponse<unknown>>(
      `${API_ROUTES.blogs}/${id}`,
      formData
    );
    return BlogMapper.toDomain(res.data as Parameters<typeof BlogMapper.toDomain>[0]);
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`${API_ROUTES.blogs}/${id}`);
  }

  async deleteImage(blogId: string, imageId: string): Promise<void> {
    await this.client.delete(`${API_ROUTES.blogs}/${blogId}/images/${imageId}`);
  }
}
