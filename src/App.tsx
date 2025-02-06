import { Route, Routes } from "react-router";
import Counter from "./components/Counter";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Welcome from "./components/Welcome";
import HomePage from "./pages/HomePage";
import TermsPage from "./pages/TermsPage";
import NotFoundPage from "./pages/NotFound";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListPage from "./pages/ProductListPage";
import LetterTemplateApp from "./components/LetterTemplateApp";
import { Teacher, ProfileCardProps } from "./components/ProfileCard";

// type Teacher = {
//   id: number;
//   name: string;
//   job: string;
//   year: number;
// };

const teachers: Teacher[] = [
  { id: 1, name: "Reza", year: 1998, job: "Software Engineer" },
  { id: 2, name: "Tian", year: 1997, job: "Software Engineer" },
  { id: 3, name: "Indra", year: 1998, job: "Teach Lead" },
  {
    id: 4,
    year: 1998,
  },
];

function App() {
  return (
    <>
      <Header />
      <Welcome />
      <h1>Hello World!</h1>
      <div style={{ gap: "8px", display: "flex", flexDirection: "row" }}>
        {teachers.map((teacher) => {
          return (
            <ProfileCard
              name={teacher.name}
              job={teacher.job}
              year={teacher.year}
              key={teacher.id}
            />
          );
        })}
      </div>
      <Counter />
      <LetterTemplateApp />

      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes> */}
    </>
  );
}

export default App;
