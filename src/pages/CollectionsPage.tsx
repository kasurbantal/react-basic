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
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  const handleAddOrEditCollection = () => {
    if (inputProduct.trim() === "") return;

    if (editProduct) {
      editCollection(editProduct.id, inputProduct);
      setEditProduct(null);
    } else {
      addCollection(inputProduct);
    }
    setInputProduct("");
    setSelectedCollectionId(""); // reset radio button
  };

  return (
    <>
      <h1>Collections Page</h1>
      <button disabled={collectionsIsLoading} onClick={fetchCollections}>
        Fetch
      </button>
      <br />
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
            <td>Action</td>
            <td>Select Edit</td>
          </tr>
          {/* Baris input untuk Add/Edit */}
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                placeholder="Collection name"
                value={inputProduct}
                onChange={(e) => setInputProduct(e.target.value)}
                style={{ width: "80%" }}
              />
            </td>
            <td colSpan={2}>
              <button
                onClick={handleAddOrEditCollection}
                disabled={collectionsIsLoading}
              >
                {editProduct ? "Update" : "Add"}
              </button>
              {editProduct && (
                <button
                  onClick={() => {
                    setEditProduct(null);
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
                  {/* <button
                    onClick={() => {
                      setEditProduct(collection);
                      setInputProduct(collection.product);
                    }}
                  >
                    Edit
                  </button> */}
                </td>
                <td>
                  <input
                    value={collection.id}
                    checked={selectedCollectionId === collection.id.toString()}
                    onChange={() => {
                      setSelectedCollectionId(collection.id.toString());
                      setEditProduct(collection);
                      setInputProduct(collection.product);
                    }}
                    type="radio"
                    name="collection-id"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {collectionsIsLoading && <p>Loading...</p>}
      {collectionsError && <p style={{ color: "red" }}>{collectionsError}</p>}
    </>
  );
};

export default CollectionsPage;
