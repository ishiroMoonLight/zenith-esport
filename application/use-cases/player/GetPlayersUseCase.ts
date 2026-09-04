import { Player } from "@/domain/models/Player";
import { IPlayerRepository } from "@/domain/repositories/IPlayerRepository";

/**
 * Cas d'usage : Récupérer la liste de tous les joueurs.
 */
export class GetPlayersUseCase {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(): Promise<Player[]> {
    return this.playerRepository.getAll();
  }
}
