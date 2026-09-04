"use client";

import { useEffect, useState } from "react";
import { Player } from "@/domain/models/Player";
import { getPlayerByIdUseCase } from "@/infrastructure/di/container";

/**
 * Hook de présentation — charge un joueur par son identifiant.
 */
export function usePlayerDetail(id: string) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchPlayer() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPlayerByIdUseCase.execute(id);
        if (!cancelled) setPlayer(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erreur lors du chargement du joueur.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlayer();

    return () => { cancelled = true; };
  }, [id]);

  return { player, loading, error };
}
