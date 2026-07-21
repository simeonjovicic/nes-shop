import { useEffect, useMemo, useState } from "react";
import "./App.css";

const PRODUCTS = [
  {
    id: 1,
    brand: "WAI",
    brandId: "wai",
    name: "WAI Home",
    subtitle: "Indoor Feel Shoe",
    price: 169,
    color: "Indigo",
    material: "IVIVI Barefoot Textile",
    category: "Feel Shoes",
    image: "/wai_front.jpeg",
    hoverImage: "/wai_behind.jpeg",
    tag: "Signature",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Ein leichter Feel Shoe für Zuhause, das Studio und alle Momente dazwischen. Flexibel, atmungsaktiv und bewusst reduziert konstruiert.",
  },
  {
    id: 2,
    brand: "WAI",
    brandId: "wai",
    name: "WAI Travel",
    subtitle: "Packable Loafer",
    price: 179,
    color: "Deep Navy",
    material: "Flexible Textile Upper",
    category: "Feel Shoes",
    image: "/wai1_front.jpeg",
    hoverImage: "/wai1_behind.jpeg",
    tag: "Travel",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Gemacht für Wege, Wartezeiten und leichte Routinen unterwegs. Die flexible Konstruktion lässt sich flach verstauen und bleibt stabil genug für den ganzen Tag.",
  },
  {
    id: 3,
    brand: "WAI",
    brandId: "wai",
    name: "WAI Flex",
    subtitle: "Barefoot Technology",
    price: 189,
    color: "Blue Canvas",
    material: "IVIVI Sole System",
    category: "Feel Shoes",
    image: "/wai2_front.jpeg",
    hoverImage: "/wai2_behind.jpeg",
    tag: "Flexible",
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    description:
      "Die weiche, rollbare Sohle gibt dem Fuß Raum, ohne den Look eines klassischen Slippers zu verlieren. Ruhig im Ausdruck, technisch in der Substanz.",
  },
  {
    id: 4,
    brand: "WAI",
    brandId: "wai",
    name: "WAI Lounge",
    subtitle: "Soft Everyday Slip-on",
    price: 159,
    color: "Washed Blue",
    material: "Soft-woven Textile",
    category: "Feel Shoes",
    image: "/wai3_front.jpeg",
    hoverImage: "/wai3_behind.jpeg",
    tag: null,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    description:
      "Ein entspannter Slip-on für ruhige Innenräume, kurze Wege und Tage, an denen Komfort selbstverständlich sein soll.",
  },
  {
    id: 5,
    brand: "WAI",
    brandId: "wai",
    name: "WAI Studio",
    subtitle: "Natural Movement",
    price: 174,
    color: "Stone Grey",
    material: "Breathable Upper",
    category: "Feel Shoes",
    image: "/wai8-opt.jpeg",
    hoverImage: "/wai2_front.jpeg",
    tag: null,
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Minimal im Aufbau, weich im Auftritt und präzise dort, wo Halt gebraucht wird. Für Training, Reisen und Alltag mit mehr Bewegungsfreiheit.",
  },
  {
    id: 6,
    brand: "WAI",
    brandId: "wai",
    name: "WAI Classic",
    subtitle: "All-day Feel Shoe",
    price: 184,
    color: "Midnight",
    material: "Flexible Sole",
    category: "Feel Shoes",
    image: "/wai7-opt.jpeg",
    hoverImage: "/wai1_front.jpeg",
    tag: "New",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Der vielseitige WAI Slip-on für Alltag und Wochenende: clean genug für Reisen, weich genug für Zuhause und belastbar genug für draußen.",
  },
  {
    id: 7,
    brand: "Green Comfort",
    brandId: "green",
    name: "Pully Rosso",
    subtitle: "Signature Knit Pullover",
    price: 219,
    color: "Rosso",
    material: "Heavy Jacquard Knit",
    category: "Knitwear",
    image: "/pully-red-front.png",
    hoverImage: "/pully-red-side.png",
    tag: "Knitwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Schwerer Jacquard-Strick mit reliefartiger Struktur, geradem Schnitt und gerippten Bündchen. Ein Statement-Piece aus dem Soleform-Erbe.",
  },
  {
    id: 8,
    brand: "Vehon",
    brandId: "vehon",
    name: "Duke Cervo",
    subtitle: "Mocassino",
    price: 289,
    color: "Nero",
    material: "Cervo Leather",
    category: "Mocassini",
    image: "/duke-cervo.png",
    hoverImage: "/duke-cervo.png",
    tag: "Signature",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    description:
      "Der Duke aus genarbtem Cervo-Leder wird von Hand in Italien gefertigt. Ein Mocassino, der vom Wohnraum aufs Boot und durch den ganzen Tag trägt.",
  },
  {
    id: 9,
    brand: "Vehon",
    brandId: "vehon",
    name: "Duke Velvet",
    subtitle: "Mocassino",
    price: 279,
    color: "Nero",
    material: "Velvet",
    category: "Mocassini",
    image: "/duke-velvet.png",
    hoverImage: "/duke-velvet.png",
    tag: null,
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    description:
      "Samtweicher Auftritt mit fester Haltung: der Duke in Velvet, mit eigens entwickelter Sohle für Halt, Leichtigkeit und Ruhe.",
  },
  {
    id: 10,
    brand: "Vehon",
    brandId: "vehon",
    name: "Prince Loafer",
    subtitle: "Tech-knit Loafer",
    price: 259,
    color: "Nero",
    material: "3D Knit",
    category: "Mocassini",
    image: "/prince-loafer.png",
    hoverImage: "/prince-loafer.png",
    tag: "New",
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    description:
      "Der Prince verbindet die Silhouette des klassischen Loafers mit gestricktem Obermaterial: leicht, flexibel und komplett Made in Italy.",
  },
  {
    id: 11,
    brand: "Vehon",
    brandId: "vehon",
    name: "Velluto Nero",
    subtitle: "Pantofola",
    price: 249,
    color: "Nero",
    material: "Velvet",
    category: "Pantofole",
    image: "/velluto-nero.png",
    hoverImage: "/velluto-nero.png",
    tag: null,
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Die Pantofola für drinnen: Velvet, cleaner Spann und die Ruhe von Cashmere-Decken und Marmorböden.",
  },
];

const BRANDS = [
  {
    id: "wai",
    name: "WAI",
    index: "01",
    category: "Feel Shoes",
    logo: "/brand-wai.png",
    image: "/wai10-opt.jpeg",
    position: "52% 61%",
    accent: "#2354d8",
    note: "Flexible Feel Shoes für Zuhause, Reisen und natürliche Bewegung.",
  },
  {
    id: "vehon",
    name: "Vehon",
    index: "02",
    category: "Mocassini",
    logo: null,
    image: "/hero-wai.png",
    position: "50% 72%",
    accent: "#7f2636",
    note: "Italienische Mocassini und Pantofole, von Hand vollendet.",
  },
  {
    id: "green",
    name: "Green Comfort",
    index: "03",
    category: "Knitwear",
    logo: "/brand-green-comfort.png",
    image: "/pully-red-front.png",
    position: "50% 24%",
    accent: "#17624b",
    note: "Schwerer Signature-Strick mit sichtbarer Struktur und Haltung.",
  },
];

const FEATURED_IDS = [1, 8, 7, 10];

function routeFromLocation() {
  return window.location.pathname.startsWith("/shop") ? "shop" : "home";
}

function brandFromLocation() {
  const brand = new URLSearchParams(window.location.search).get("brand");
  return BRANDS.some((item) => item.id === brand) ? brand : "all";
}

export default function App() {
  const [route, setRoute] = useState(routeFromLocation);
  const [filter, setFilter] = useState(brandFromLocation);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [bag, setBag] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    const onPopState = () => {
      setRoute(routeFromLocation());
      setFilter(brandFromLocation());
      setActiveProduct(null);
      window.scrollTo(0, 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (!activeProduct && !bagOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeProduct, bagOpen]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const items = PRODUCTS.filter((product) => {
      const matchesBrand = filter === "all" || product.brandId === filter;
      const haystack = `${product.brand} ${product.name} ${product.subtitle} ${product.material}`.toLowerCase();
      return matchesBrand && (!query || haystack.includes(query));
    });

    return [...items].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  }, [filter, search, sort]);

  const active = PRODUCTS.find((product) => product.id === activeProduct) || null;
  const bagCount = bag.reduce((sum, item) => sum + item.qty, 0);
  const bagTotal = bag.reduce((sum, item) => {
    const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  function navigateHome(section) {
    setRoute("home");
    setActiveProduct(null);
    window.history.pushState({}, "", "/");
    window.setTimeout(() => {
      if (section) document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  function navigateShop(brand = "all") {
    setRoute("shop");
    setFilter(brand);
    setSearch("");
    setActiveProduct(null);
    const query = brand === "all" ? "" : `?brand=${brand}`;
    window.history.pushState({}, "", `/shop${query}`);
    window.scrollTo(0, 0);
  }

  function updateFilter(brand) {
    setFilter(brand);
    const query = brand === "all" ? "" : `?brand=${brand}`;
    window.history.replaceState({}, "", `/shop${query}`);
  }

  function openProduct(productId) {
    setSelectedSize("");
    setActiveProduct(productId);
  }

  function addToBag(productId, size) {
    setBag((current) => {
      const match = current.findIndex((item) => item.productId === productId && item.size === size);
      if (match === -1) return [...current, { productId, size, qty: 1 }];
      return current.map((item, index) =>
        index === match ? { ...item, qty: item.qty + 1 } : item,
      );
    });
    setActiveProduct(null);
    setBagOpen(true);
  }

  function updateBagItem(index, delta) {
    setBag((current) =>
      current
        .map((item, itemIndex) =>
          itemIndex === index ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }

  return (
    <div className="site">
      <Header
        route={route}
        scrolled={scrolled}
        bagCount={bagCount}
        onHome={navigateHome}
        onShop={navigateShop}
        onBag={() => setBagOpen(true)}
      />

      {route === "home" ? (
        <HomePage onShop={navigateShop} onOpen={openProduct} />
      ) : (
        <ShopPage
          products={visibleProducts}
          filter={filter}
          onFilter={updateFilter}
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
          onOpen={openProduct}
        />
      )}

      <Footer onHome={navigateHome} onShop={navigateShop} />

      {active && (
        <ProductDetail
          product={active}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onClose={() => setActiveProduct(null)}
          onAdd={() => selectedSize && addToBag(active.id, selectedSize)}
        />
      )}

      <BagDrawer
        bag={bag}
        open={bagOpen}
        total={bagTotal}
        onClose={() => setBagOpen(false)}
        onUpdate={updateBagItem}
        onShop={() => {
          setBagOpen(false);
          navigateShop();
        }}
      />
    </div>
  );
}

function Header({ route, scrolled, bagCount, onHome, onShop, onBag }) {
  const overHero = route === "home" && !scrolled;
  return (
    <header className={`site-header${overHero ? " over-hero" : ""}`}>
      <div className="announcement">
        <span>Versandkostenfrei ab EUR 150</span>
        <span>14 Tage Rückgabe</span>
        <span>Persönliche Beratung</span>
      </div>
      <nav className="nav" aria-label="Hauptnavigation">
        <div className="nav-side nav-side-left">
          <button type="button" onClick={() => onShop("all")} aria-current={route === "shop" ? "page" : undefined}>
            Shop
          </button>
          <button type="button" onClick={() => onHome("brands")}>Marken</button>
        </div>
        <button className="wordmark" type="button" onClick={() => onHome()} aria-label="N.E.S Startseite">
          N.E.S
        </button>
        <div className="nav-side nav-side-right">
          <button type="button" onClick={() => onHome("standard")}>Über N.E.S</button>
          <button className="bag-button" type="button" onClick={onBag} aria-label={`Warenkorb mit ${bagCount} Artikeln`}>
            Bag <span>{bagCount}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

function HomePage({ onShop, onOpen }) {
  const featured = FEATURED_IDS.map((id) => PRODUCTS.find((product) => product.id === id));
  return (
    <main>
      <section className="hero-home">
        <img className="hero-home-image" src="/wai4-opt.jpeg" alt="WAI Feel Shoe in einer ruhigen Wohnszene" />
        <div className="hero-home-shade" />
        <div className="hero-home-copy">
          <p className="kicker">The new Soleform house</p>
          <h1>N.E.S</h1>
          <p className="hero-line">Drei Marken für die Art, wie wir uns bewegen.</p>
          <p className="hero-description">
            WAI Feel Shoes, Vehon Mocassini und Green Comfort Knitwear. Eigenständige
            Kollektionen, verbunden durch Material, Komfort und klare Form.
          </p>
          <div className="hero-actions">
            <button className="button button-light" type="button" onClick={() => onShop("all")}>
              Kollektion entdecken
            </button>
            <a className="text-link text-link-light" href="#brands">Die drei Marken</a>
          </div>
        </div>
        <div className="hero-index" aria-label="Die drei N.E.S Marken">
          <span>01 WAI</span>
          <span>02 Vehon</span>
          <span>03 Green Comfort</span>
        </div>
      </section>

      <section className="section brands-section" id="brands">
        <div className="section-heading split-heading">
          <div>
            <p className="kicker">Das Haus</p>
            <h2>Drei Welten.<br />Ein gemeinsamer Maßstab.</h2>
          </div>
          <p>
            N.E.S ist kein Sammelsurium, sondern ein kuratiertes Haus. Jede Marke löst Komfort
            anders: über Bewegung, italienisches Schuhhandwerk oder markanten Strick.
          </p>
        </div>
        <div className="brand-grid">
          {BRANDS.map((brand) => (
            <button
              className={`brand-tile brand-${brand.id}`}
              key={brand.id}
              type="button"
              onClick={() => onShop(brand.id)}
              style={{ "--brand-accent": brand.accent }}
            >
              <img
                className="brand-tile-image"
                src={brand.image}
                alt=""
                aria-hidden="true"
                style={{ objectPosition: brand.position }}
              />
              <span className="brand-tile-shade" />
              <span className="brand-tile-top">{brand.index} / {brand.category}</span>
              <span className="brand-tile-copy">
                <BrandMark brand={brand} />
                <span>{brand.note}</span>
                <span className="brand-tile-link">Kollektion ansehen <b aria-hidden="true">&#8594;</b></span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-heading collection-heading">
          <div>
            <p className="kicker">Selected from the house</p>
            <h2>Im Fokus</h2>
          </div>
          <button className="text-link" type="button" onClick={() => onShop("all")}>
            Alle Produkte ansehen <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
        <div className="product-grid product-grid-featured">
          {featured.map((product) => (
            <ProductCard product={product} key={product.id} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section className="standard-section" id="standard">
        <div className="standard-media">
          <img src="/craftsmanship-wai.png" alt="Handwerkliche Fertigung in einem italienischen Atelier" />
          <span>Atelier / Italy</span>
        </div>
        <div className="standard-copy">
          <p className="kicker">Der N.E.S Maßstab</p>
          <h2>Was bleibt, wenn man alles Laute weglässt.</h2>
          <p className="standard-intro">
            Gute Dinge beginnen beim Material und enden in der Bewegung. Deshalb wählt N.E.S
            Marken, deren Komfort sichtbar gestaltet und sorgfältig gefertigt ist.
          </p>
          <div className="principles">
            <div><span>01</span><strong>Material</strong><p>Texturen mit Funktion, Charakter und einem langen Leben.</p></div>
            <div><span>02</span><strong>Handwerk</strong><p>Präzise Konstruktion statt kurzlebiger Effekte.</p></div>
            <div><span>03</span><strong>Bewegung</strong><p>Formen, die den Alltag begleiten und nicht dominieren.</p></div>
          </div>
          <button className="button button-dark" type="button" onClick={() => onShop("all")}>
            Das Sortiment entdecken
          </button>
        </div>
      </section>

      <ServiceStrip />
      <Newsletter />
    </main>
  );
}

function ShopPage({ products, filter, onFilter, search, onSearch, sort, onSort, onOpen }) {
  return (
    <main className="shop-page">
      <section className="shop-intro">
        <p className="breadcrumbs">N.E.S / Shop</p>
        <div className="shop-intro-heading">
          <h1>Die Kollektion</h1>
          <p>
            Feel Shoes, italienische Mocassini und charakterstarker Strick. Alle drei N.E.S Marken
            an einem Ort.
          </p>
        </div>
      </section>

      <section className="catalog" aria-label="Produktkatalog">
        <div className="catalog-tabs" role="group" aria-label="Nach Marke filtern">
          <button className={filter === "all" ? "active" : ""} type="button" onClick={() => onFilter("all")}>Alle</button>
          {BRANDS.map((brand) => (
            <button
              className={filter === brand.id ? "active" : ""}
              key={brand.id}
              type="button"
              onClick={() => onFilter(brand.id)}
            >
              {brand.name}
            </button>
          ))}
        </div>

        <div className="catalog-toolbar">
          <label className="search-field">
            <span>Suche</span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Produkte durchsuchen"
            />
          </label>
          <span className="result-count">{products.length} {products.length === 1 ? "Produkt" : "Produkte"}</span>
          <label className="sort-field">
            <span>Sortieren</span>
            <select value={sort} onChange={(event) => onSort(event.target.value)}>
              <option value="featured">Empfohlen</option>
              <option value="price-asc">Preis: aufsteigend</option>
              <option value="price-desc">Preis: absteigend</option>
              <option value="name">Name: A-Z</option>
            </select>
          </label>
        </div>

        {products.length > 0 ? (
          <div className="product-grid catalog-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} onOpen={onOpen} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>Keine Produkte gefunden.</h2>
            <p>Versuche einen anderen Suchbegriff oder wechsle die Marke.</p>
          </div>
        )}
      </section>
      <ServiceStrip />
    </main>
  );
}

function BrandMark({ brand }) {
  if (brand.logo) return <img className="brand-logo" src={brand.logo} alt={brand.name} />;
  return <strong className="brand-name">{brand.name}</strong>;
}

function ProductCard({ product, onOpen }) {
  return (
    <article className={`product-card product-brand-${product.brandId}`}>
      <button className="product-media" type="button" onClick={() => onOpen(product.id)} aria-label={`${product.name} ansehen`}>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <img className="product-image product-image-main" src={product.image} alt={product.name} />
        <img className="product-image product-image-hover" src={product.hoverImage} alt="" aria-hidden="true" />
        <span className="product-open" title="Größe wählen" aria-hidden="true">+</span>
      </button>
      <button className="product-copy" type="button" onClick={() => onOpen(product.id)}>
        <span className="product-brand">{product.brand}</span>
        <span className="product-title-row">
          <strong>{product.name}</strong>
          <span>EUR {product.price}</span>
        </span>
        <span className="product-subtitle">{product.subtitle} / {product.color}</span>
      </button>
    </article>
  );
}

function ProductDetail({ product, selectedSize, onSelectSize, onClose, onAdd }) {
  return (
    <div className="product-overlay" role="dialog" aria-modal="true" aria-label={product.name}>
      <main className="product-detail">
        <button className="detail-close" type="button" onClick={onClose} aria-label="Produktdetail schließen">&#215;</button>
        <div className={`detail-gallery product-brand-${product.brandId}`}>
          <div className="detail-image"><img src={product.image} alt={product.name} /></div>
          <div className="detail-image detail-image-secondary"><img src={product.hoverImage} alt={`${product.name}, weitere Ansicht`} /></div>
        </div>
        <div className="detail-content">
          <button className="detail-back" type="button" onClick={onClose}>
            <span aria-hidden="true">&#8592;</span> Zurück zur Kollektion
          </button>
          <p className="kicker">{product.brand} / {product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-subtitle">{product.subtitle} / {product.color}</p>
          <p className="detail-price">EUR {product.price}</p>

          <div className="size-picker">
            <div className="size-picker-heading"><span>Größe wählen</span><button type="button">Größenberatung</button></div>
            <div className="sizes">
              {product.sizes.map((size) => (
                <button
                  className={selectedSize === size ? "active" : ""}
                  key={size}
                  type="button"
                  onClick={() => onSelectSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="add-button" type="button" disabled={!selectedSize} onClick={onAdd}>
            {selectedSize ? `In den Warenkorb / ${selectedSize}` : "Bitte Größe wählen"}
          </button>

          <p className="detail-description">{product.description}</p>
          <dl className="detail-facts">
            <div><dt>Material</dt><dd>{product.material}</dd></div>
            <div><dt>Farbe</dt><dd>{product.color}</dd></div>
            <div><dt>Versand</dt><dd>Kostenfrei ab EUR 150</dd></div>
            <div><dt>Rückgabe</dt><dd>Innerhalb von 14 Tagen</dd></div>
          </dl>
        </div>
      </main>
    </div>
  );
}

function BagDrawer({ bag, open, total, onClose, onUpdate, onShop }) {
  return (
    <>
      <button className={`drawer-backdrop${open ? " open" : ""}`} type="button" onClick={onClose} aria-label="Warenkorb schließen" />
      <aside className={`bag-drawer${open ? " open" : ""}`} aria-label="Warenkorb" aria-hidden={!open}>
        <div className="bag-heading">
          <div><p className="kicker">N.E.S</p><h2>Warenkorb</h2></div>
          <button type="button" onClick={onClose} aria-label="Warenkorb schließen">&#215;</button>
        </div>

        <div className="bag-content">
          {bag.length === 0 ? (
            <div className="bag-empty">
              <p>Dein Warenkorb ist leer.</p>
              <button className="button button-dark" type="button" onClick={onShop}>Zum Shop</button>
            </div>
          ) : (
            bag.map((item, index) => {
              const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
              if (!product) return null;
              return (
                <article className="bag-item" key={`${item.productId}-${item.size}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="bag-item-copy">
                    <span>{product.brand}</span>
                    <h3>{product.name}</h3>
                    <p>Größe {item.size}</p>
                    <div className="quantity-control" aria-label={`Menge für ${product.name}`}>
                      <button type="button" onClick={() => onUpdate(index, -1)} aria-label="Menge reduzieren">-</button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => onUpdate(index, 1)} aria-label="Menge erhöhen">+</button>
                    </div>
                  </div>
                  <strong>EUR {product.price * item.qty}</strong>
                </article>
              );
            })
          )}
        </div>

        {bag.length > 0 && (
          <div className="bag-footer">
            <div><span>Zwischensumme</span><strong>EUR {total}</strong></div>
            <p>Versand und Steuern werden im Checkout berechnet.</p>
            <button className="checkout-button" type="button">Weiter zum Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}

function ServiceStrip() {
  return (
    <section className="service-strip" aria-label="Shop Services">
      <div><span>01</span><strong>Kostenloser Versand</strong><p>Ab einem Bestellwert von EUR 150.</p></div>
      <div><span>02</span><strong>14 Tage Rückgabe</strong><p>In Ruhe anprobieren und entscheiden.</p></div>
      <div><span>03</span><strong>Persönliche Beratung</strong><p>Hilfe bei Modell, Material und Größe.</p></div>
    </section>
  );
}

function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <section className="newsletter">
      <p className="kicker">Notes from the house</p>
      <h2>Neue Modelle, Materialien und Geschichten.</h2>
      {subscribed ? (
        <p className="newsletter-success">Danke. Du bist auf der Liste.</p>
      ) : (
        <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}>
          <label htmlFor="newsletter-email">E-Mail-Adresse</label>
          <input id="newsletter-email" type="email" placeholder="name@email.com" required />
          <button type="submit">Anmelden <span aria-hidden="true">&#8594;</span></button>
        </form>
      )}
    </section>
  );
}

function Footer({ onHome, onShop }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-about">
          <button className="footer-wordmark" type="button" onClick={() => onHome()}>N.E.S</button>
          <p>Das Haus für WAI Feel Shoes, Vehon Mocassini und Green Comfort Knitwear.</p>
        </div>
        <div className="footer-column">
          <h3>Kollektionen</h3>
          <button type="button" onClick={() => onShop("wai")}>WAI</button>
          <button type="button" onClick={() => onShop("vehon")}>Vehon</button>
          <button type="button" onClick={() => onShop("green")}>Green Comfort</button>
        </div>
        <div className="footer-column">
          <h3>Service</h3>
          <a href="#shipping">Versand & Rückgabe</a>
          <a href="#contact">Kontakt</a>
          <a href="#sizes">Größenberatung</a>
        </div>
        <div className="footer-column">
          <h3>Das Haus</h3>
          <button type="button" onClick={() => onHome("standard")}>Über N.E.S</button>
          <a href="#atelier">Atelier</a>
          <a href="#stockists">Stockists</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 N.E.S</span>
        <span>Austria / EUR</span>
        <span>Impressum / Datenschutz</span>
      </div>
    </footer>
  );
}
