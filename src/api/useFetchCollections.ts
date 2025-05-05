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

  return {
    fetchCollections,
    collectionsIsLoading,
    collectionsError,
    collections,
  };
};
