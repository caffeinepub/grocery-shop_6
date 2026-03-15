import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, ShopInfo } from "../backend.d";
import { useActor } from "./useActor";

export function useShopInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ShopInfo | null>({
    queryKey: ["shopInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getShopInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: string, enabled: boolean) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useSetShopInfo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { name: string; location: string; contact: string }) =>
      actor!.setShopInfo(args.name, args.location, args.contact),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shopInfo"] }),
  });
}

export function useAddOrUpdateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: {
      name: string;
      category: string;
      price: bigint;
      quantity: bigint;
      isAvailable: boolean;
    }) =>
      actor!.addOrUpdateProduct(
        p.name,
        p.category,
        p.price,
        p.quantity,
        p.isAvailable,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
