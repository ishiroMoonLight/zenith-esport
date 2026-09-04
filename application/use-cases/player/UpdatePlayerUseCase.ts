import { Player } from "@/domain/models/Player";
import { IPlayerRepository, UpdatePlayerInput } from "@/domain/repositories/IPlayerRepository";

/**
 * Cas d'usage : Mettre à jour un joueur existant.
 */
export class UpdatePlayerUseCase {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(id: string, input: UpdatePlayerInput): Promise<Player> {
    return this.playerRepository.update(id, input);
  }
}
