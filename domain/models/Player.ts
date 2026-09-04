/**
 * Personnage joué par un joueur dans le roster (optionnel).
 */
export interface CharacterMain {
  character: string;
  characterImage: string;
}

/**
 * Liens réseaux sociaux d'un joueur (optionnel).
 */
export interface PlayerSocials {
  twitter?: string;
  twitch?: string;
  youtube?: string;
  instagram?: string;
}

/**
 * Entité métier Player (Clean Architecture - Domain).
 * Contient les champs natifs du backend ainsi que les alias de confort UI.
 */
export interface Player {
  // Champs natifs backend
  id: string;
  nom: string;
  prenom: string;
  pseudo: string;
  image: string | null;
  isDeleted?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;

  // Propriétés de confort UI (compatibilité Roster et Modal)
  gamertag: string;
  name: string;
  playerImage: string;
  rank?: string;
  mains?: CharacterMain[];
  socials?: PlayerSocials;
}
