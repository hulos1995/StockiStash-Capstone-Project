import Hero from "../../components/Hero/Hero";
import PageBody from "../../components/PageBody/PageBody";
const HomePage = ({ isDarkMode }) => {
  return (
    <main>
      <PageBody isDarkMode={isDarkMode} />
    </main>
  );
};
export default HomePage;
