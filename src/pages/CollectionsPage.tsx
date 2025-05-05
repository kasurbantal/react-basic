import { useFetchCollections } from "../api/useFetchCollections";

const CollectionsPage = () => {
  const {
    collections,
    collectionsError,
    collectionsIsLoading,
    fetchCollections,
  } = useFetchCollections();

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
              <tr>
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
      {collectionsIsLoading && <p>Loading...</p>}
      {collectionsError && <p style={{ color: "red" }}>{collectionsError}</p>}
    </>
  );
};

export default CollectionsPage;
