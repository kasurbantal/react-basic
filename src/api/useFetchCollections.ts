import { useState } from "react";

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
      const res = await fetch("http://localhost:2000/collections", {
        method: "GET",
      });

      const resJson = (await res.json()) as CollectionResponse[];

      setCollections(resJson);
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
