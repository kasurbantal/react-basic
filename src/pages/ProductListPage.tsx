import { useNavigate, useSearchParams } from "react-router";

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSortValueChange = (sortValue: string) => {
    searchParams.set("sort", sortValue);
    setSearchParams(searchParams);
  };

  const handleSortAsc = (sortValue: string) => {
    searchParams.set("sort", sortValue);
    setSearchParams(searchParams);
  };
  const handleSortByPopular = (sortValue: string) => {
    searchParams.set("sort", sortValue);
    setSearchParams(searchParams);
    navigate("/terms");
  };

  const handleNavigateToTerms = () => {
    navigate({
      pathname: "/terms",
    });
  };

  return (
    <>
      <h1>Product List Page</h1>
      <ul>
        <li>Sort: {searchParams.get("sort")}</li>
        <li>Name: {searchParams.get("name")}</li>
      </ul>

      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        <button onClick={() => handleSortValueChange("price-desc")}>
          Sort price desc
        </button>
        <button onClick={() => handleSortAsc("sort-asc")}>Sort asc</button>
        <button onClick={() => handleSortByPopular("popular")}>
          Sort by popular
        </button>
      </div>
      <br />
      <button onClick={handleNavigateToTerms}>to Terms</button>
    </>
  );
};

export default ProductListPage;
