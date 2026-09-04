export interface CreatePlayerDto {
  nom: string;
  prenom: string;
  pseudo: string;
  image?: File | null;
}

export interface UpdatePlayerDto {
  nom?: string;
  prenom?: string;
  pseudo?: string;
  image?: File | null;
}
