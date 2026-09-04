import { Player } from "@/domain/models/Player";
import { IPlayerRepository, CreatePlayerInput } from "@/domain/repositories/IPlayerRepository";

/**
 * Cas d'usage : Créer un nouveau joueur avec image optionnelle.
 */
export class CreatePlayerUseCase {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(input: CreatePlayerInput): Promise<Player> {
    return this.playerRepository.create(input);
  }
}
