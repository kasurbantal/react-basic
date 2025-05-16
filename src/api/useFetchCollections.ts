import { useState } from "react";
import { AxiosInstance } from "../lib/axios";

// Tipe data untuk respons dari endpoint /collections
type CollectionResponse = {
  id: number;
  product: string;
  factory: string;
};

export const useFetchCollections = () => {
  // State untuk menyimpan data koleksi
  const [collections, setCollections] = useState<CollectionResponse[]>([]);

  // State untuk status loading saat fetch/add/delete/update
  const [collectionsIsLoading, setCollectionsIsLoading] = useState(false);

  // State untuk menyimpan pesan error jika terjadi error
  const [collectionsError, setCollectionsError] = useState("");

  // State untuk menyimpan data yang sedang diedit (product & factory)
  const [editProduct, setEditProduct] = useState<CollectionResponse | null>(
    null
  );
  const [editFactory, setEditFactory] = useState<CollectionResponse | null>(
    null
  );

  // Fungsi untuk mengambil data dari API
  const fetchCollections = async () => {
    try {
      setCollectionsIsLoading(true); // set loading saat proses berjalan
      const res = await AxiosInstance.get<CollectionResponse[]>("/collections");
      setCollections(res.data); // simpan data hasil fetch
    } catch (error) {
      setCollectionsError((error as TypeError).message); // jika error, tampilkan pesan
    } finally {
      setCollectionsIsLoading(false); // reset loading status
    }
  };

  // Fungsi untuk menambahkan koleksi baru
  const addCollection = async (product: string, factory: string) => {
    try {
      setCollectionsIsLoading(true);
      const res = await AxiosInstance.post<CollectionResponse>("/collections", {
        product,
        factory,
      });
      setCollections((prev) => [...prev, res.data]); // tambahkan data baru ke state
    } catch (error) {
      setCollectionsError((error as TypeError).message);
    } finally {
      setCollectionsIsLoading(false);
    }
  };

  // Fungsi untuk menghapus koleksi berdasarkan ID
  const deleteCollection = async (id: number) => {
    try {
      setCollectionsIsLoading(true);
      await AxiosInstance.delete(`/collections/${id}`);
      setCollections((prev) => prev.filter((item) => item.id !== id)); // filter data yang dihapus
    } catch (error) {
      setCollectionsError((error as TypeError).message);
    } finally {
      setCollectionsIsLoading(false);
    }
  };

  // Fungsi untuk mengedit data koleksi berdasarkan ID
  const editCollection = async (
    id: number,
    newProduct: string,
    newFactory: string
  ) => {
    try {
      setCollectionsIsLoading(true);
      const res = await AxiosInstance.patch<CollectionResponse>(
        `/collections/${id}`,
        {
          product: newProduct,
          factory: newFactory,
        }
      );
      // Update data produk dan factory secara terpisah
      setCollections((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, product: res.data.product } : item
        )
      );
      setCollections((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, factory: res.data.factory } : item
        )
      );
      setEditProduct(null); // reset mode edit
      setEditFactory(null);
    } catch (error) {
      setCollectionsError((error as TypeError).message);
    } finally {
      setCollectionsIsLoading(false);
    }
  };

  // Return semua fungsi dan state yang bisa digunakan di komponen
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
    editFactory,
    setEditFactory,
  };
};
