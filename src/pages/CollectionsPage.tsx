import { useState } from "react";
import { useFetchCollections } from "../api/useFetchCollections";

const CollectionsPage = () => {
  const {
    collections,
    collectionsError,
    collectionsIsLoading,
    fetchCollections,
    addCollection,
  } = useFetchCollections();

  const [newProduct, setNewProduct] = useState("");
  const handleAddCollection = () => {
    if (newProduct.trim() === "") return;
    addCollection(newProduct);
    setNewProduct(""); // reset input setelah ditambahkan
  };

  return (
    <>
      <h1>Collections Page</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Product</td>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => {
            return (
              <tr key={collection.id}>
                <td>{collection.id}</td>
                <td>{collection.product}</td>
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
        placeholder="Add new collection"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <button onClick={handleAddCollection} disabled={collectionsIsLoading}>
        Add
      </button>
      {collectionsIsLoading && <p>Loading...</p>}
      {collectionsError && <p style={{ color: "red" }}>{collectionsError}</p>}
    </>
  );
};

export default CollectionsPage;
