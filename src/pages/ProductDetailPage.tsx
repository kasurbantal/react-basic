import { useParams } from "react-router";

const ProductDetailPage = () => {
  const params = useParams<{ slug: string }>();
  return (
    <div>
      <h1>Product Detail Page</h1>
      <h3>{params.slug}</h3>
    </div>
  );
};

export default ProductDetailPage;
