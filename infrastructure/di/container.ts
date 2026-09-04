import { HttpBlogRepository } from "@/infrastructure/repositories/HttpBlogRepository";
import { HttpPlayerRepository } from "@/infrastructure/repositories/HttpPlayerRepository";
import { GetBlogsUseCase } from "@/application/use-cases/blog/GetBlogsUseCase";
import { GetBlogByIdUseCase } from "@/application/use-cases/blog/GetBlogByIdUseCase";
import { CreateBlogUseCase } from "@/application/use-cases/blog/CreateBlogUseCase";
import { UpdateBlogUseCase } from "@/application/use-cases/blog/UpdateBlogUseCase";
import { DeleteBlogUseCase } from "@/application/use-cases/blog/DeleteBlogUseCase";
import { DeleteBlogImageUseCase } from "@/application/use-cases/blog/DeleteBlogImageUseCase";
import { GetPlayersUseCase } from "@/application/use-cases/player/GetPlayersUseCase";
import { GetPlayerByIdUseCase } from "@/application/use-cases/player/GetPlayerByIdUseCase";
import { CreatePlayerUseCase } from "@/application/use-cases/player/CreatePlayerUseCase";
import { UpdatePlayerUseCase } from "@/application/use-cases/player/UpdatePlayerUseCase";
import { DeletePlayerUseCase } from "@/application/use-cases/player/DeletePlayerUseCase";

/**
 * Conteneur d'injection de dépendances (Clean Architecture - Infrastructure).
 * Instancie les repositories et les use cases en singletons.
 * Toutes les dépendances partent de ce point central.
 */

// ── Repositories ──────────────────────────────────────────────────────────────
const blogRepository = new HttpBlogRepository();
const playerRepository = new HttpPlayerRepository();

// ── Blog Use Cases ─────────────────────────────────────────────────────────────
export const getBlogsUseCase = new GetBlogsUseCase(blogRepository);
export const getBlogByIdUseCase = new GetBlogByIdUseCase(blogRepository);
export const createBlogUseCase = new CreateBlogUseCase(blogRepository);
export const updateBlogUseCase = new UpdateBlogUseCase(blogRepository);
export const deleteBlogUseCase = new DeleteBlogUseCase(blogRepository);
export const deleteBlogImageUseCase = new DeleteBlogImageUseCase(blogRepository);

// ── Player Use Cases ───────────────────────────────────────────────────────────
export const getPlayersUseCase = new GetPlayersUseCase(playerRepository);
export const getPlayerByIdUseCase = new GetPlayerByIdUseCase(playerRepository);
export const createPlayerUseCase = new CreatePlayerUseCase(playerRepository);
export const updatePlayerUseCase = new UpdatePlayerUseCase(playerRepository);
export const deletePlayerUseCase = new DeletePlayerUseCase(playerRepository);
