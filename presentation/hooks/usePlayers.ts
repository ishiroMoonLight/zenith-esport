"use client";

import { useEffect, useState } from "react";
import { Player } from "@/domain/models/Player";
import { getPlayersUseCase } from "@/infrastructure/di/container";

/**
 * Hook de présentation — charge la liste de tous les joueurs depuis l'API.
 */
export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlayersUseCase.execute();
      setPlayers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement du roster.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { players, loading, error, refetch };
}

/**
 * Alias de usePlayers pour conformité d'appellation.
 */
export const usePlayer = usePlayers;
