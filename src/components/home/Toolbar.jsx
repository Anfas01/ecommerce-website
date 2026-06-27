

function Toolbar({ activeCategory, setActiveCategory }) {


  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="toolbar">
      <button className="toolbar__button toolbar__button-filter" aria-label="Filter products">
        <i className="fa-solid fa-filter"></i>
      </button>

      <div className="category-header category-drawer">
        <button className="category-drawer__close" aria-label="Close Navigation Menu">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <ul className="category-drawer__list">
          {["All", "Top", "Bottoms", "Accessories"].map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="category-drawer__item"
            >
              <a
                href="#product-grid"
                className={`category-drawer__link ${activeCategory === category ? "category-drawer__link--active" : ""
                  }`}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button className="toolbar__button toolbar__button-sort" aria-label="Sort products">
        <i className="fa-solid fa-sort"></i>
      </button>
    </div>
  )
}

export default Toolbar