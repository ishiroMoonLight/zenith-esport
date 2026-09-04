import { IPlayerRepository } from "@/domain/repositories/IPlayerRepository";

/**
 * Cas d'usage : Supprimer un joueur par son identifiant.
 */
export class DeletePlayerUseCase {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(id: string): Promise<void> {
    return this.playerRepository.delete(id);
  }
}
