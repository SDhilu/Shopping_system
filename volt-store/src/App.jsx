
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import { products, formatPrice } from "./data";
import "./styles.css";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("volt-cart")) || [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("volt-cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, search, sort]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to bag`);
    setCartOpen(true);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function chooseCategory(category) {
    setActiveCategory(category);
    setMobileMenu(false);
    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div className="app-shell">
      <div className="announcement">
        <span>THE NEW SEASON IS HERE.</span>
        <span>FREE DELIVERY ON ORDERS OVER LKR 15,000 ↗</span>
      </div>

      <header className="navbar">
        <button
          className="icon-button mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <a className="logo" href="#home">
          VOLT<span>®</span>
        </a>

        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <a href="#shop" onClick={() => setMobileMenu(false)}>
            Shop all
          </a>
          <button onClick={() => chooseCategory("Clothing")}>
            Clothing
          </button>
          <button onClick={() => chooseCategory("Footwear")}>
            Footwear
          </button>
          <button onClick={() => chooseCategory("Accessories")}>
            Accessories
          </button>
        </nav>

        <div className="nav-actions">
          <label className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                document.getElementById("shop")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              placeholder="Search..."
              aria-label="Search products"
            />
          </label>

          <button
            className="icon-button bag-button"
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping bag"
          >
            <ShoppingBag size={21} />
            <span className="bag-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow light-eyebrow">
              <span className="status-dot" />
              INDEPENDENT STYLE. UNCOMMON ENERGY.
            </div>

            <h1>
              LESS
              <br />
              BASIC<span className="lime-period">.</span>
              <br />
              <span className="outline-text">MORE YOU.</span>
            </h1>

            <p className="hero-description">
              Everyday essentials with a little extra attitude.
              Find your next favourite thing.
            </p>

            <a href="#shop" className="hero-cta">
              SHOP THE DROP <ArrowDownRight size={20} />
            </a>

            <div className="hero-bottom-note">
              <span>DESIGNED FOR EVERY DAY</span>
              <span>DROP 001 / 2026</span>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90"
              alt="Contemporary streetwear fashion editorial"
            />

            <div className="hero-image-label">
              <span>THE NEW UNIFORM</span>
              <ArrowUpRight size={20} />
            </div>

            <div className="hero-sticker">
              <span>FIND</span>
              <span>YOUR</span>
              <span>VOLT ↗</span>
            </div>
          </div>

          <div className="hero-index">01 — 04</div>
        </section>

        <section className="ticker" aria-label="Brand message">
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <div className="ticker-group" key={index}>
                <span>OWN YOUR EVERYDAY</span>
                <span className="ticker-star">✳</span>
                <span>NOT HERE TO BLEND IN</span>
                <span className="ticker-star">✳</span>
                <span>GOOD THINGS ONLY</span>
                <span className="ticker-star">✳</span>
              </div>
            ))}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="status-dot dark-dot" />
                THE VOLT SELECTION
              </div>
              <h2>
                Good stuff.
                <br />
                <span>Great energy.</span>
              </h2>
            </div>

            <p>
              Thoughtful essentials, everyday icons and pieces
              that do a little more.
            </p>
          </div>

          <div className="shop-toolbar">
            <div className="category-list">
              {["All", "Clothing", "Footwear", "Accessories"].map(
                (category) => (
                  <button
                    key={category}
                    className={
                      activeCategory === category
                        ? "category-button active"
                        : "category-button"
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            <label className="sort-control">
              <span>SORT:</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>

          <div className="results-line">
            <span>SHOWING {filteredProducts.length} PRODUCTS</span>
            <span>MADE FOR YOUR EVERYDAY ↘</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="product-image"
                    />

                    {product.tag && (
                      <span
                        className={
                          product.tag === "SALE"
                            ? "product-tag sale-tag"
                            : "product-tag"
                        }
                      >
                        {product.tag}
                      </span>
                    )}

                    <button
                      className={
                        wishlist.includes(product.id)
                          ? "wishlist-button wishlisted"
                          : "wishlist-button"
                      }
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        wishlist.includes(product.id)
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <Heart
                        size={19}
                        fill={
                          wishlist.includes(product.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <button
                      className="quick-add"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO BAG <Plus size={17} />
                    </button>
                  </div>

                  <div className="product-info">
                    <div className="product-name-row">
                      <h3>{product.name}</h3>
                      <span className="product-index">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="product-color">{product.color}</p>

                    <div className="price-row">
                      <span className="product-price">
                        {formatPrice(product.price)}
                      </span>

                      {product.oldPrice && (
                        <span className="old-price">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-products">
              <h3>No matches. Yet.</h3>
              <p>Try a different search or category.</p>
              <button
                className="dark-button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                VIEW ALL PRODUCTS <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>

        <section className="campaign">
          <div className="campaign-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
              alt="Fashion-forward everyday streetwear"
              loading="lazy"
            />
          </div>

          <div className="campaign-copy">
            <div className="eyebrow">
              VOLT / YOUR DAILY ROTATION
            </div>

            <h2>
              Your style.
              <br />
              <span>Your rules.</span>
            </h2>

            <p>
              No complicated rules. No chasing every trend.
              Just good pieces that feel like you.
            </p>

            <button
              className="dark-button"
              onClick={() => chooseCategory("Clothing")}
            >
              EXPLORE CLOTHING <ArrowRight size={18} />
            </button>

            <div className="campaign-footnote">
              THE EVERYDAY COLLECTION — 001
            </div>
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-symbol">✳</div>
          <div>
            <div className="eyebrow">A LITTLE SOMETHING EXTRA</div>
            <h2>Good things land here.</h2>
            <p>New drops, fresh finds and first dibs. No noise.</p>
          </div>

          <button
            className="newsletter-button"
            onClick={() =>
              setNotice("Newsletter signup can be connected to a real service next.")
            }
          >
            COUNT ME IN <ArrowUpRight size={18} />
          </button>
        </section>
      </main>

      <footer className="footer">
        <a className="logo footer-logo" href="#home">
          VOLT<span>®</span>
        </a>
        <p>GOOD STYLE. GOOD ENERGY.</p>
        <span>© 2026 VOLT STUDIO</span>
      </footer>

      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          <span>{notice}</span>
          <button
            className="toast-close"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
            aria-label="Shopping bag"
          >
            <div className="cart-header">
              <div>
                <div className="eyebrow">YOUR SELECTION</div>
                <h2>Shopping bag ({cartCount})</h2>
              </div>

              <button
                className="icon-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
              >
                <X size={22} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={42} strokeWidth={1.3} />
                <h3>Your bag is taking it easy.</h3>
                <p>Give it something good to carry.</p>
                <button
                  className="dark-button"
                  onClick={() => setCartOpen(false)}
                >
                  KEEP EXPLORING <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>{item.color}</p>
                        <strong>{formatPrice(item.price)}</strong>

                        <div className="quantity-control">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() =>
                          setCart((current) =>
                            current.filter((product) => product.id !== item.id)
                          )
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>SUBTOTAL</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>

                  <p>Delivery and any applicable fees are calculated separately.</p>

                  <button
                    className="checkout-button"
                    onClick={() =>
                      setNotice("Checkout is a demo. No payment has been taken.")
                    }
                  >
                    CONTINUE TO CHECKOUT <ArrowRight size={18} />
                  </button>

                  <button
                    className="continue-shopping"
                    onClick={() => setCartOpen(false)}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
