export interface CreateBlogDto {
  titre: string;
  description: string;
  contenu: string;
  images?: File[];
}

export interface UpdateBlogDto {
  titre?: string;
  description?: string;
  contenu?: string;
  images?: File[];
}
