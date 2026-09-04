import { Player } from "@/domain/models/Player";
import { IPlayerRepository, CreatePlayerInput, UpdatePlayerInput } from "@/domain/repositories/IPlayerRepository";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { PlayerMapper } from "@/infrastructure/mappers/PlayerMapper";
import { API_ROUTES } from "@/infrastructure/config/apiConfig";

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
 * Implémentation HTTP concrète du repository Player.
 */
export class HttpPlayerRepository implements IPlayerRepository {
  private readonly client: HttpClient;

  constructor() {
    this.client = new HttpClient();
  }

  async getAll(): Promise<Player[]> {
    const res = await this.client.get<ApiListResponse<unknown>>(API_ROUTES.players);
    return PlayerMapper.toDomainList(res.data as Parameters<typeof PlayerMapper.toDomainList>[0]);
  }

  async getById(id: string): Promise<Player> {
    const res = await this.client.get<ApiSingleResponse<unknown>>(
      `${API_ROUTES.players}/${id}`
    );
    return PlayerMapper.toDomain(res.data as Parameters<typeof PlayerMapper.toDomain>[0]);
  }

  async create(input: CreatePlayerInput): Promise<Player> {
    const formData = new FormData();
    formData.append("nom", input.nom);
    formData.append("prenom", input.prenom);
    formData.append("pseudo", input.pseudo);
    if (input.image) {
      formData.append("image", input.image);
    }

    const res = await this.client.postFormData<ApiSingleResponse<unknown>>(
      API_ROUTES.players,
      formData
    );
    return PlayerMapper.toDomain(res.data as Parameters<typeof PlayerMapper.toDomain>[0]);
  }

  async update(id: string, input: UpdatePlayerInput): Promise<Player> {
    const formData = new FormData();
    if (input.nom !== undefined) formData.append("nom", input.nom);
    if (input.prenom !== undefined) formData.append("prenom", input.prenom);
    if (input.pseudo !== undefined) formData.append("pseudo", input.pseudo);
    if (input.image) formData.append("image", input.image);

    const res = await this.client.putFormData<ApiSingleResponse<unknown>>(
      `${API_ROUTES.players}/${id}`,
      formData
    );
    return PlayerMapper.toDomain(res.data as Parameters<typeof PlayerMapper.toDomain>[0]);
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`${API_ROUTES.players}/${id}`);
  }
}
