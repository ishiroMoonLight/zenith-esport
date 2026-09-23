import type { MetadataRoute } from "next";
import { SITE_URL } from "@/infrastructure/config/siteConfig";
import { getBlogsUseCase } from "@/infrastructure/di/container";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Pages statiques principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/roster`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Articles de blog dynamiques
  try {
    const blogs = await getBlogsUseCase.execute();
    const dynamicBlogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug || blog.id}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...dynamicBlogRoutes];
  } catch (error) {
    // Si l'API backend n'est pas joignable lors de la génération du sitemap
    console.warn("Sitemap: Impossible de récupérer les blogs dynamiques depuis l'API, utilisation des routes statiques.", error);
    return staticRoutes;
  }
}
