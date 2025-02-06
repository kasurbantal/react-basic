import { useSearchParams } from "react-router";

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <h1>Product List Page</h1>
    </>
  );
};

export default ProductListPage;
