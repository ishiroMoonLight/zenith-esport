import { Player } from "../models/Player";

/**
 * Données nécessaires à la création d'un joueur.
 */
export interface CreatePlayerInput {
  nom: string;
  prenom: string;
  pseudo: string;
  image?: File | null;
}

/**
 * Données pour la mise à jour d'un joueur.
 */
export interface UpdatePlayerInput {
  nom?: string;
  prenom?: string;
  pseudo?: string;
  image?: File | null;
}

/**
 * Contrat d'interface pour le repository Player (Clean Architecture - Domain).
 */
export interface IPlayerRepository {
  getAll(): Promise<Player[]>;
  getById(id: string): Promise<Player>;
  create(input: CreatePlayerInput): Promise<Player>;
  update(id: string, input: UpdatePlayerInput): Promise<Player>;
  delete(id: string): Promise<void>;
}
