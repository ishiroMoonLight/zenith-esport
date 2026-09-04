import { Player } from "@/domain/models/Player";

/**
 * Format brut de la réponse API backend pour un joueur.
 */
interface ApiPlayer {
  id: string;
  nom: string;
  prenom: string;
  pseudo: string;
  image: string | null;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Mapper Player — convertit les DTOs de l'API backend en entités du domaine frontend.
 */
export class PlayerMapper {
  /**
   * Transforme un objet brut de l'API en entité Player du domaine.
   */
  static toDomain(raw: ApiPlayer): Player {
    return {
      // Champs natifs backend
      id: raw.id,
      nom: raw.nom,
      prenom: raw.prenom,
      pseudo: raw.pseudo,
      image: raw.image,
      isDeleted: raw.isDeleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,

      // Alias de confort UI (compatibilité avec Roster et PlayerModal)
      gamertag: raw.pseudo,
      name: `${raw.prenom} ${raw.nom}`,
      playerImage: raw.image ?? "/zenith/players/placeholder.jpg",

      // Champs optionnels non gérés par le backend actuel
      rank: undefined,
      mains: [],
      socials: {},
    };
  }

  /**
   * Transforme une liste de DTOs en liste d'entités Player.
   */
  static toDomainList(raws: ApiPlayer[]): Player[] {
    return raws.map(PlayerMapper.toDomain);
  }
}
