import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    isAvailable: boolean;
    quantity: bigint;
    category: string;
    price: bigint;
}
export interface ShopInfo {
    contact: string;
    name: string;
    location: string;
}
export interface backendInterface {
    addOrUpdateProduct(name: string, category: string, price: bigint, quantity: bigint, isAvailable: boolean): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getProduct(name: string): Promise<Product | null>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getShopInfo(): Promise<ShopInfo | null>;
    setShopInfo(name: string, location: string, contact: string): Promise<void>;
    updateProductAvailability(name: string, isAvailable: boolean): Promise<void>;
    updateProductQuantity(name: string, quantity: bigint): Promise<void>;
}
