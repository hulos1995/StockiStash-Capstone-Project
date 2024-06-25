import "./DarkMode.scss";
const DarkMode = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkMode;
