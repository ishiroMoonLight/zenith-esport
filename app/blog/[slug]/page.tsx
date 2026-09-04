import BlogDetailPageView from "@/presentation/pages/BlogDetailPageView";
import { notFound } from "next/navigation";

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
