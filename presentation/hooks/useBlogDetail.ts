"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/domain/models/Blog";
import { getBlogByIdUseCase } from "@/infrastructure/di/container";

/**
 * Hook de présentation — charge un blog par son identifiant.
 */
export function useBlogDetail(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchBlog() {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogByIdUseCase.execute(id);
        if (!cancelled) setBlog(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erreur lors du chargement de l'article.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBlog();

    return () => { cancelled = true; };
  }, [id]);

  return { blog, loading, error };
}
