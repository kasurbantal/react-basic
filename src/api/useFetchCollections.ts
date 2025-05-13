import { useState } from "react";
import { AxiosInstance } from "../lib/axios";

type CollectionResponse = {
  id: number;
  product: string;
};

export const useFetchCollections = () => {
  const [collections, setCollections] = useState<CollectionResponse[]>([]);
  const [collectionsIsLoading, setCollectionsIsLoading] = useState(false);
  const [collectionsError, setCollectionsError] = useState("");
  const [editProduct, setEditProduct] = useState<CollectionResponse | null>(
    null
  );

  const fetchCollections = async () => {
    try {
      setCollectionsIsLoading(true);

      const res = await AxiosInstance.get<CollectionResponse[]>("/collections");

      setCollections(res.data);
    } catch (error) {
      setCollectionsError((error as TypeError).message);
    } finally {
      setCollectionsIsLoading(false);
    }
  };

  const addCollection = async (product: string) => {
    try {
      setCollectionsIsLoading(true);
      const res = await AxiosInstance.post<CollectionResponse>("/collections", {
        product,
      });
      setCollections((prev) => [...prev, res.data]);
    } catch (error) {
      setCollectionsError((error as TypeError).message);
    } finally {
      setCollectionsIsLoading(false);
    }
  };

  const deleteCollection = async (id: number) => {
    try {
      setCollectionsIsLoading(true);
      await AxiosInstance.delete(`/collections/${id}`);
      setCollections((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setCollectionsError((error as TypeError).message);
    } finally {
      setCollectionsIsLoading(false);
    }
  };

  const editCollection = async (id: number, newProduct: string) => {
    try {
      setCollectionsIsLoading(true);
      const res = await AxiosInstance.put<CollectionResponse>(
        `/collections/${id}`,
        {
          product: newProduct,
        }
      );
      setCollections((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, product: res.data.product } : item
        )
      );
      setEditProduct(null); // Reset editing state after updating
    } catch (error) {
      setCollectionsError((error as TypeError).message);
    } finally {
      setCollectionsIsLoading(false);
    }
  };

  return {
    fetchCollections,
    addCollection,
    collectionsIsLoading,
    collectionsError,
    collections,
    deleteCollection,
    editCollection,
    editProduct,
    setEditProduct,
  };
};
