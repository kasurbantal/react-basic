import { useState } from "react";
import { useFetchCollections } from "../api/useFetchCollections";

const CollectionsPage = () => {
  // Destructuring semua data & fungsi dari custom hook
  const {
    collections,
    collectionsError,
    collectionsIsLoading,
    fetchCollections,
    addCollection,
    deleteCollection,
    editCollection,
    editProduct,
    editFactory,
    setEditProduct,
    setEditFactory,
  } = useFetchCollections();

  // State untuk input form
  const [inputProduct, setInputProduct] = useState("");
  const [inputFactory, setInputFactory] = useState("");

  // State untuk menyimpan ID koleksi yang dipilih untuk diedit
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  // Fungsi handle untuk menambahkan atau mengedit koleksi
  const handleAddOrEditCollection = () => {
    if (inputProduct.trim() === "") return; // validasi agar tidak input kosong

    if (editProduct && editFactory) {
      // Mode edit
      editCollection(editProduct.id, inputProduct, inputFactory);
      setEditProduct(null); // keluar dari mode edit
      alert("Edited: " + selectedCollectionId);
    } else {
      // Mode tambah
      addCollection(inputProduct, inputFactory);
    }

    // Reset input dan pilihan
    setInputProduct("");
    setInputFactory("");
    setSelectedCollectionId("");
  };

  return (
    <>
      <h1>Collections Page</h1>
      {/* Tombol untuk fetch data dari server */}
      <button disabled={collectionsIsLoading} onClick={fetchCollections}>
        Fetch
      </button>
      <br />
      {/* Tabel utama */}
      <table
        style={{
          width: "100%",
          textAlign: "center",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <td>ID</td>
            <td>Product</td>
            <td>Factory</td>
            <td>Action</td>
            <td>Select Edit</td>
          </tr>
          {/* Input baris pertama di dalam tabel */}
          <tr>
            <td colSpan={3}>
              <input
                type="text"
                placeholder="Collection name"
                value={inputProduct}
                onChange={(e) => setInputProduct(e.target.value)}
                style={{ width: "90%" }}
              />
              <input
                type="text"
                placeholder="Factory name"
                value={inputFactory}
                onChange={(e) => setInputFactory(e.target.value)}
                style={{ width: "90%" }}
              />
            </td>

            <td colSpan={2}>
              {/* Tombol tambah/edit */}
              <button
                onClick={handleAddOrEditCollection}
                disabled={collectionsIsLoading}
              >
                {editProduct && editFactory ? "Update" : "Add"}
              </button>

              {/* Tombol cancel edit */}
              {editProduct && editFactory && (
                <button
                  onClick={() => {
                    setEditProduct(null);
                    setInputFactory("");
                    setInputProduct("");
                    setSelectedCollectionId("");
                  }}
                  style={{ marginLeft: "8px" }}
                >
                  Cancel Edit
                </button>
              )}
            </td>
          </tr>
        </thead>
        <tbody>
          {/* Mapping semua data koleksi */}
          {collections.map((collection) => {
            return (
              <tr key={collection.id}>
                <td>{collection.id}</td>
                <td>{collection.product}</td>
                <td>{collection.factory}</td>
                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Yakin ingin menghapus koleksi ini?")
                      ) {
                        deleteCollection(collection.id); // Hapus koleksi
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {/* Radio button untuk memilih koleksi yang akan diedit */}
                  <input
                    disabled={collectionsIsLoading}
                    value={collection.id}
                    checked={selectedCollectionId === collection.id.toString()}
                    onChange={() => {
                      setSelectedCollectionId(collection.id.toString());
                      setEditProduct(collection); // simpan data untuk diedit
                      setInputProduct(collection.product);
                      setEditFactory(collection);
                      setInputFactory(collection.factory);
                    }}
                    type="radio"
                    name="collection-id" // agar hanya bisa memilih satu
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Loading dan error handling */}
      {collectionsIsLoading && <p>Loading...</p>}
      {collectionsError && <p style={{ color: "red" }}>{collectionsError}</p>}
    </>
  );
};

export default CollectionsPage;
