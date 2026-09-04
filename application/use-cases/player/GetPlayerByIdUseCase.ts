import { Player } from "@/domain/models/Player";
import { IPlayerRepository } from "@/domain/repositories/IPlayerRepository";

/**
 * Cas d'usage : Récupérer un joueur par son identifiant.
 */
export class GetPlayerByIdUseCase {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(id: string): Promise<Player> {
    return this.playerRepository.getById(id);
  }
}
