"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/domain/models/Blog";
import { getBlogsUseCase } from "@/infrastructure/di/container";

/**
 * Hook de présentation — charge la liste de tous les blogs depuis l'API.
 */
export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogsUseCase.execute();
        if (!cancelled) setBlogs(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erreur lors du chargement des articles.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBlogs();

    return () => { cancelled = true; };
  }, []);

  return { blogs, loading, error };
}
