import { useState } from "react";
import { useFetchCollections } from "../api/useFetchCollections";

const CollectionsPage = () => {
  const {
    collections,
    collectionsError,
    collectionsIsLoading,
    fetchCollections,
    addCollection,
    deleteCollection,
    editCollection,
    editProduct,
    setEditProduct,
  } = useFetchCollections();

  const [inputProduct, setInputProduct] = useState("");

  const handleAddOrEditCollection = () => {
    if (inputProduct.trim() === "") return;

    if (editProduct) {
      editCollection(editProduct.id, inputProduct);
      setEditProduct(null);
    } else {
      addCollection(inputProduct);
    }
    setInputProduct("");
  };

  return (
    <>
      <h1>Collections Page</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Product</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => {
            return (
              <tr key={collection.id}>
                <td>{collection.id}</td>
                <td>{collection.product}</td>
                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Yakin ingin menghapus koleksi ini?")
                      ) {
                        deleteCollection(collection.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditProduct(collection);
                      setInputProduct(collection.product);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button disabled={collectionsIsLoading} onClick={fetchCollections}>
        Fetch
      </button>
      <br />

      <input
        type="text"
        placeholder="Collection name"
        value={inputProduct}
        onChange={(e) => setInputProduct(e.target.value)}
      />

      <button
        onClick={handleAddOrEditCollection}
        disabled={collectionsIsLoading}
      >
        {editProduct ? "Update" : "Add"}
      </button>

      {/* Tombol cancel edit ini akan tampil ketika tombol add dalam kondisi untuk edit */}
      {editProduct && (
        <button
          onClick={() => {
            setEditProduct(null);
            setInputProduct(""); // reset input jika batal edit
          }}
        >
          Cancel Edit
        </button>
      )}
      {collectionsIsLoading && <p>Loading...</p>}
      {collectionsError && <p style={{ color: "red" }}>{collectionsError}</p>}
    </>
  );
};

export default CollectionsPage;
