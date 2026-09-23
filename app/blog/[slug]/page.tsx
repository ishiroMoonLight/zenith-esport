import type { Metadata } from "next";
import BlogDetailPageView from "@/presentation/pages/BlogDetailPageView";
import { notFound } from "next/navigation";
import { getBlogByIdUseCase } from "@/infrastructure/di/container";
import { siteConfig, SITE_URL } from "@/infrastructure/config/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return { title: "Article introuvable" };
  }

  try {
    const blog = await getBlogByIdUseCase.execute(slug);
    if (!blog) {
      return { title: "Article introuvable" };
    }

    const title = blog.title || blog.titre || "Actualité";
    const description =
      blog.excerpt ||
      blog.description ||
      `Découvrez l'article "${title}" sur Zenith E-Sport.`;
    const image = blog.image || siteConfig.ogImage;
    const url = `${SITE_URL}/blog/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: `${title} | ${siteConfig.name}`,
        description,
        url,
        type: "article",
        publishedTime: blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
        modifiedTime: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
        images: [
          {
            url: image,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${siteConfig.name}`,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Actualité",
      description: "Détail de l'actualité Zenith E-Sport.",
    };
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  return <BlogDetailPageView blogId={slug} />;
}

