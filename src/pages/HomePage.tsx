import { Link } from "react-router";

Link;
const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>Setujui persyaratan</p>
      <Link to="/terms">Menuju Terms Page</Link>
    </>
  );
};

export default HomePage;
