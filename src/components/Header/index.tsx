import "./styles.css";

function Header() {
  return (
    <header className="flex flex-col justify-center items-center mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold">
        🛰️NASA Astronomy Picture of the Day
      </h1>
      <p className="text-gray-400 ml-4">
        Explore the wonders of the universe with NASA's daily image.
      </p>
    </header>
  );
}

export default Header;
