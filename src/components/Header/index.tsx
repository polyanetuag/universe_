import './styles.css'

function Header() {
  return (
    <header className='header-container'>
      <div>
        <h1>Logo</h1>
        <p>Universo</p>
      </div>
      {/* <img src="" alt="Logo" />
      <h2>Universe</h2> */}
      <nav>
        <div className="nav-links">
          <a href="#about">Sobre</a>
          <a href="#explore">Explore</a>
        </div>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar..." />
        <button type="submit">Buscar</button>
      </div>
     

    </header>
  );
}

export default Header;