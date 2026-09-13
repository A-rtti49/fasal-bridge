import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";

const languages = ["English", "हिंदी", "ਪੰਜਾਬੀ", "मराठी", "বাংলা"];

const demoOrders = [
  {
    id: "ORD-1023",
    product: "Fresh Tomatoes",
    emoji: "🍅",
    amount: "10 kg · ₹300",
    customer: "Aditi Sharma",
    location: "Delhi, India",
    date: "12 Sep",
    status: "Pending",
  },
  {
    id: "ORD-1022",
    product: "Potatoes",
    emoji: "🥔",
    amount: "20 kg · ₹600",
    customer: "Rohit Mehta",
    location: "Gurugram, India",
    date: "11 Sep",
    status: "Completed",
  },
];

function Logo({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <img
  src={logo}
  alt="FasalBridge"
  className="brand-logo"
  onError={(e) => {
    e.currentTarget.style.display = "none";
    e.currentTarget.nextElementSibling.style.display = "flex";
  }}
/>

      <div className="fallback-logo">
        <div className="fallback-icon">🌾</div>

        <div className="fallback-name">
          <span>फसल</span>
          <strong>Bridge</strong>
        </div>
      </div>

      <p>Connecting farmers and consumers</p>
    </div>
  );
}

function BottomNav({ page, setPage }) {
  return (
    <div className="bottom-nav">
      <button
        className={page === "home" ? "nav-active" : ""}
        onClick={() => setPage("home")}
      >
        <span>⌂</span>
        Home
      </button>

      <button
        className={page === "sell" ? "nav-active" : ""}
        onClick={() => setPage("sell")}
      >
        <span>＋</span>
        Sell
      </button>

      <button
        className={page === "orders" ? "nav-active" : ""}
        onClick={() => setPage("orders")}
      >
        <span>▣</span>
        Orders
      </button>

      <button
        className={
          ["profile", "settings", "help"].includes(page)
            ? "nav-active"
            : ""
        }
        onClick={() => setPage("profile")}
      >
        <span>♟</span>
        Profile
      </button>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("language");

  const [language, setLanguage] = useState("English");
  const [location, setLocation] = useState("");
  const [loginType, setLoginType] = useState("phone");
  const [loginValue, setLoginValue] = useState("");

  const [notifications, setNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);

  const [farmerId, setFarmerId] = useState("");
  const [farmSize, setFarmSize] = useState("");

  const [orderTab, setOrderTab] = useState("Received");

  const [faqOpen, setFaqOpen] = useState(null);

  const [productImage, setProductImage] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    priceUnit: "per kg",
    quantityUnit: "kg",
  });

  const handleLogin = () => {
    if (!location.trim()) {
      alert("Please enter your location.");
      return;
    }

    if (!loginValue.trim()) {
      alert(
        loginType === "phone"
          ? "Please enter your phone number."
          : "Please enter your email."
      );
      return;
    }

    setPage("role");
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.quantity
    ) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Product listed successfully!");
    setPage("home");
  };

  const logout = () => {
    setLoginValue("");
    setPage("language");
  };

  return (
    <div className="app-background">
      <div className="app-container">

        {/* ==================================================
            PAGE 1 - LANGUAGE
        ================================================== */}

        {page === "language" && (
          <section className="screen welcome-page">
            <Logo />

            <div className="welcome-content">
              <h1>Welcome!</h1>
              <p>Choose your language</p>

              <div className="language-grid">
                {languages.map((item) => (
                  <button
                    key={item}
                    className={
                      language === item
                        ? "language-btn language-selected"
                        : "language-btn"
                    }
                    onClick={() => setLanguage(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                className="primary-btn"
                onClick={() => setPage("login")}
              >
                Continue →
              </button>

              <div className="plant-decoration">🌱</div>
            </div>
          </section>
        )}

        {/* ==================================================
            PAGE 2 - LOGIN / LOCATION
        ================================================== */}

        {page === "login" && (
          <section className="screen">
            <button
              className="floating-back"
              onClick={() => setPage("language")}
            >
              ←
            </button>

            <Logo />

            <div className="login-content">
              <div className="location-box">
                <h2>📍 Your Location</h2>

                <p>
                  Enter your location to find nearby produce and buyers.
                </p>

                <input
                  type="text"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="login-section">
                <h2>Login</h2>

                <p>Continue with your phone number or email.</p>

                <div className="login-tabs">
                  <button
                    className={
                      loginType === "phone"
                        ? "login-tab active-login-tab"
                        : "login-tab"
                    }
                    onClick={() => {
                      setLoginType("phone");
                      setLoginValue("");
                    }}
                  >
                    Phone Number
                  </button>

                  <button
                    className={
                      loginType === "email"
                        ? "login-tab active-login-tab"
                        : "login-tab"
                    }
                    onClick={() => {
                      setLoginType("email");
                      setLoginValue("");
                    }}
                  >
                    Email ID
                  </button>
                </div>

                {loginType === "phone" ? (
                  <div className="phone-row">
                    <div className="country-code">+91</div>

                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={loginValue}
                      onChange={(e) =>
                        setLoginValue(e.target.value)
                      }
                    />
                  </div>
                ) : (
                  <input
                    className="email-field"
                    type="email"
                    placeholder="Enter email ID"
                    value={loginValue}
                    onChange={(e) =>
                      setLoginValue(e.target.value)
                    }
                  />
                )}

                <button
                  className="primary-btn"
                  onClick={handleLogin}
                >
                  Continue →
                </button>

                <p className="terms">
                  By continuing, you agree to our{" "}
                  <u>Terms & Privacy Policy</u>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ==================================================
            PAGE 3 - BUY / SELL
        ================================================== */}

        {page === "role" && (
          <section className="screen role-page">
            <button
              className="floating-back"
              onClick={() => setPage("login")}
            >
              ←
            </button>

            <Logo />

            <div className="role-content">
              <h1>What would you like to do?</h1>
              <p>Choose an option to continue</p>

              <div className="role-grid">
                <button
                  className="role-card"
                  onClick={() => setPage("buyer")}
                >
                  <div className="role-icon">🛒</div>
                  <h2>Buy Produce</h2>
                  <p>
                    Explore fresh produce directly from farmers.
                  </p>
                </button>

                <button
                  className="role-card seller-role"
                  onClick={() => setPage("home")}
                >
                  <div className="role-icon">🌾</div>
                  <h2>Sell Produce</h2>
                  <p>
                    List your produce and connect with buyers.
                  </p>
                </button>
              </div>

              <p className="mini-text">
                · Fresh produce &nbsp;&nbsp; Direct connections ·
              </p>
            </div>
          </section>
        )}

        {/* ==================================================
            BUYER PAGE
        ================================================== */}

        {page === "buyer" && (
          <section className="screen app-page">
            <header className="top-header">
              <Logo compact />
            </header>

            <div className="page-content">
              <button
                className="back-text"
                onClick={() => setPage("role")}
              >
                ← Back
              </button>

              <h1>Fresh Produce</h1>

              <p className="page-subtitle">
                Buy directly from farmers near you.
              </p>

              <div className="search-box">
                🔍
                <input
                  type="text"
                  placeholder="Search fruits, vegetables..."
                />
              </div>

              <div className="produce-grid">
                {[
                  ["🍅", "Fresh Tomatoes", "₹30/kg"],
                  ["🥔", "Potatoes", "₹28/kg"],
                  ["🥕", "Carrots", "₹40/kg"],
                  ["🥬", "Spinach", "₹25/bunch"],
                ].map(([emoji, name, price]) => (
                  <div className="produce-card" key={name}>
                    <div className="produce-image">{emoji}</div>
                    <h3>{name}</h3>
                    <strong>{price}</strong>
                    <p>Fresh farm produce</p>

                    <button
                      onClick={() =>
                        alert(`${name} added to cart.`)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================
            PAGE 4 - SELLER HOME
        ================================================== */}

        {page === "home" && (
          <section className="screen app-page">
            <header className="top-header">
              <Logo compact />
            </header>

            <div className="page-content">
              <div className="welcome-card">
                <div>
                  <p>Good to see you back,</p>
                  <h1>Ramesh Kumar!</h1>
                  <h3>Grow. Sell. Empower.</h3>
                </div>

                <div className="welcome-art">
                  🌱 🌾
                </div>
              </div>

              <div className="stats-row">
                <div className="stat-box">
                  <span>📦</span>
                  <div>
                    <strong>12</strong>
                    <small>Total Orders</small>
                  </div>
                </div>

                <div className="stat-box">
                  <span>🌱</span>
                  <div>
                    <strong>5</strong>
                    <small>Active Listings</small>
                  </div>
                </div>

                <div className="stat-box">
                  <span>₹</span>
                  <div>
                    <strong>4.8k</strong>
                    <small>This Month</small>
                  </div>
                </div>
              </div>

              <div className="farm-message">
                <div>
                  <strong>
                    🌿 Fresh Produce. Fair Prices.
                  </strong>

                  <p>Stronger farming communities.</p>
                </div>

                <span>✨</span>
              </div>

              <div className="home-actions">
                <button onClick={() => setPage("sell")}>
                  <span className="circle dark">＋</span>
                  <strong>List New Product</strong>
                  <small>Start selling produce</small>
                </button>

                <button onClick={() => setPage("orders")}>
                  <span className="circle gold">◇</span>
                  <strong>View Orders</strong>
                  <small>Track your sales</small>
                </button>

                <button onClick={() => setPage("profile")}>
                  <span className="circle green">♟</span>
                  <strong>My Profile</strong>
                  <small>Manage your account</small>
                </button>
              </div>

              <div className="section-heading-row">
                <div>
                  <h2>Your Listings</h2>
                  <p>
                    Products currently available for buyers
                  </p>
                </div>

                <button onClick={() => setPage("sell")}>
                  See all →
                </button>
              </div>

              <div className="listing-card">
                <div className="listing-image">🍅</div>

                <div className="listing-info">
                  <strong>Fresh Tomatoes</strong>
                  <p>₹30/kg</p>
                  <small>50 kg available</small>
                </div>

                <span className="active-label">
                  Active
                </span>
              </div>
            </div>

            <BottomNav page={page} setPage={setPage} />
          </section>
        )}

        {/* ==================================================
            PAGE 5 - LIST NEW PRODUCT
        ================================================== */}

        {page === "sell" && (
          <section className="screen app-page">
            <header className="top-header">
              <Logo compact />
            </header>

            <form
              className="page-content"
              onSubmit={handleProductSubmit}
            >
              <div className="page-title-row">
                <div className="title-icon">🌱</div>

                <div>
                  <h1>List a New Product</h1>
                  <p>
                    Add your harvest and start reaching buyers.
                  </p>
                </div>
              </div>

              <div className="form-card">
                <h2>📷 Product Information</h2>

                <label>Product Photo *</label>

                <label className="upload-area">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt="Produce"
                      className="product-preview"
                    />
                  ) : (
                    <>
                      <div className="cloud-icon">☁</div>
                      <strong>
                        Upload a clear photo of your produce
                      </strong>
                      <small>
                        JPG or PNG · Maximum 5 MB
                      </small>
                      <span>Choose Photo</span>
                    </>
                  )}

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setProductImage(
                          URL.createObjectURL(file)
                        );
                      }
                    }}
                  />
                </label>

                <label>Product Name *</label>

                <input
                  type="text"
                  placeholder="e.g. Fresh Tomatoes"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      name: e.target.value,
                    })
                  }
                />

                <label>Category *</label>

                <select
                  value={product.category}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select category</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Grains</option>
                  <option>Pulses</option>
                  <option>Dairy</option>
                </select>

                <div className="two-column">
                  <div>
                    <label>Price *</label>

                    <div className="combined-field">
                      <span>₹</span>

                      <input
                        type="number"
                        placeholder="30"
                        value={product.price}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            price: e.target.value,
                          })
                        }
                      />

                      <select
                        value={product.priceUnit}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            priceUnit: e.target.value,
                          })
                        }
                      >
                        <option>per kg</option>
                        <option>per piece</option>
                        <option>per dozen</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label>Quantity *</label>

                    <div className="combined-field">
                      <input
                        type="number"
                        placeholder="100"
                        value={product.quantity}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            quantity: e.target.value,
                          })
                        }
                      />

                      <select
                        value={product.quantityUnit}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            quantityUnit: e.target.value,
                          })
                        }
                      >
                        <option>kg</option>
                        <option>g</option>
                        <option>pieces</option>
                      </select>
                    </div>
                  </div>
                </div>

                <label>Description</label>

                <textarea
                  placeholder="Tell buyers about your produce — quality, variety, farming method, freshness, etc."
                  value={product.description}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      description: e.target.value,
                    })
                  }
                />

                <button className="primary-btn">
                  List Product →
                </button>
              </div>
            </form>

            <BottomNav page={page} setPage={setPage} />
          </section>
        )}

        {/* ==================================================
            PAGE 6 - ORDERS
        ================================================== */}

        {page === "orders" && (
          <section className="screen app-page">
            <header className="top-header">
              <Logo compact />
            </header>

            <div className="page-content">
              <div className="page-title-row">
                <div className="title-icon">📦</div>

                <div>
                  <h1>Orders</h1>
                  <p>
                    Track, manage and fulfil your customer
                    orders.
                  </p>
                </div>
              </div>

              <div className="order-stats">
                <div>
                  <small>Today's Orders</small>
                  <strong>04</strong>
                </div>

                <div>
                  <small>Pending</small>
                  <strong>02</strong>
                </div>

                <div>
                  <small>Completed</small>
                  <strong>18</strong>
                </div>
              </div>

              <div className="order-tabs">
                {[
                  "Received",
                  "Processing",
                  "Completed",
                  "Cancelled",
                ].map((tab) => (
                  <button
                    key={tab}
                    className={
                      orderTab === tab
                        ? "selected-order-tab"
                        : ""
                    }
                    onClick={() => setOrderTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="orders-list">
                {demoOrders.map((order) => (
                  <div className="order-card" key={order.id}>
                    <div className="order-card-top">
                      <div className="product-order-info">
                        <div className="order-image">
                          {order.emoji}
                        </div>

                        <div>
                          <small>{order.id}</small>
                          <h3>{order.product}</h3>
                          <p>{order.amount}</p>
                        </div>
                      </div>

                      <div className="order-meta">
                        <small>{order.date}</small>

                        <span
                          className={
                            order.status === "Pending"
                              ? "pending"
                              : "completed"
                          }
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="customer-info-row">
                      <div className="customer-info">
                        <span className="customer-avatar">
                          ♟
                        </span>

                        <div>
                          <strong>
                            {order.customer}
                          </strong>
                          <small>
                            {order.location}
                          </small>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          alert(
                            `${order.id}\n${order.product}\n${order.customer}\n${order.amount}`
                          )
                        }
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <BottomNav page={page} setPage={setPage} />
          </section>
        )}

        {/* ==================================================
            PAGE 7 - PROFILE
        ================================================== */}

        {page === "profile" && (
          <section className="screen app-page">
            <header className="top-header">
              <Logo compact />
            </header>

            <div className="page-content profile-page">
              <div className="page-title-row no-icon">
                <div>
                  <h1>My Profile</h1>
                  <p>
                    Manage your account and farm details
                  </p>
                </div>
              </div>

              <div className="profile-section">
                <h3>Personal Information</h3>

                <div className="profile-row">
                  <span>Name</span>
                  <strong>Ramesh Kumar</strong>
                </div>

                <div className="profile-row">
                  <span>Phone Number</span>
                  <strong>+91 98765 43210</strong>
                </div>

                <div className="profile-row">
                  <span>Email</span>
                  <strong>
                    ramesh@example.com
                  </strong>
                </div>

                <div className="profile-row">
                  <span>Location</span>
                  <strong>
                    {location || "Delhi, India"}
                  </strong>
                </div>

                <div className="profile-row">
                  <span>Language</span>

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                  >
                    {languages.map((item) => (
                      <option key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="profile-section">
                <h3>Farmer Verification</h3>

                <p className="profile-note">
                  Farmer ID is optional. Add it for future
                  profile verification.
                </p>

                <input
                  type="text"
                  placeholder="Enter Farmer ID"
                  value={farmerId}
                  onChange={(e) =>
                    setFarmerId(e.target.value)
                  }
                />

                <button
                  className="small-green-btn"
                  onClick={() => {
                    if (!farmerId) {
                      alert("Enter Farmer ID first.");
                      return;
                    }

                    alert("Farmer ID added.");
                  }}
                >
                  Add Farmer ID
                </button>
              </div>

              <div className="profile-section">
                <h3>🌱 Farm Information</h3>

                <div className="profile-row">
                  <span>Farm Name</span>
                  <strong>Green Fields Farm</strong>
                </div>

                <div className="profile-row">
                  <span>Farm Type</span>

                  <select defaultValue="Individual Farmer">
                    <option>
                      Individual Farmer
                    </option>
                    <option>Organic Farm</option>
                    <option>Cooperative</option>
                  </select>
                </div>

                <div className="profile-row">
                  <span>Farm Size</span>

                  <input
                    className="profile-inline-input"
                    placeholder="e.g. 5 acres"
                    value={farmSize}
                    onChange={(e) =>
                      setFarmSize(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="profile-menu">
                <button
                  onClick={() =>
                    setPage("settings")
                  }
                >
                  <span>⚙ Settings</span>
                  <span>›</span>
                </button>

                <button
                  onClick={() =>
                    setPage("help")
                  }
                >
                  <span>❔ Help & Support</span>
                  <span>›</span>
                </button>

                <button
                  className="logout-btn"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to log out?"
                      )
                    ) {
                      logout();
                    }
                  }}
                >
                  <span>↪ Log Out</span>
                  <span>›</span>
                </button>
              </div>
            </div>

            <BottomNav page={page} setPage={setPage} />
          </section>
        )}

        {/* ==================================================
            PAGE 8 - SETTINGS
        ================================================== */}

        {page === "settings" && (
          <section className="screen app-page">
            <header className="top-header">
              <Logo compact />
            </header>

            <div className="page-content">
              <div className="subpage-title">
                <button onClick={() => setPage("profile")}>
                  ←
                </button>

                <div>
                  <h1>Settings</h1>
                  <p>Manage your app preferences</p>
                </div>
              </div>

              <div className="settings-section">
                <h3>App Preferences</h3>

                <div className="settings-row">
                  <div>
                    <strong>Language</strong>
                    <small>
                      Choose your preferred language
                    </small>
                  </div>

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                  >
                    {languages.map((item) => (
                      <option key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="settings-section">
                <h3>Notifications</h3>

                <div className="settings-row">
                  <div>
                    <strong>
                      App Notifications
                    </strong>
                    <small>
                      Receive important updates
                    </small>
                  </div>

                  <button
                    className={
                      notifications
                        ? "switch switch-on"
                        : "switch"
                    }
                    onClick={() =>
                      setNotifications(
                        !notifications
                      )
                    }
                  >
                    <span></span>
                  </button>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Order Updates</strong>
                    <small>
                      Get updates about new orders
                    </small>
                  </div>

                  <button
                    className={
                      orderUpdates
                        ? "switch switch-on"
                        : "switch"
                    }
                    onClick={() =>
                      setOrderUpdates(
                        !orderUpdates
                      )
                    }
                  >
                    <span></span>
                  </button>
                </div>
              </div>

              <div className="settings-section">
                <h3>Account</h3>

                <button
                  className="setting-menu-item"
                  onClick={() =>
                    alert(
                      "Privacy page can be added here."
                    )
                  }
                >
                  Privacy <span>›</span>
                </button>

                <button
                  className="setting-menu-item"
                  onClick={() =>
                    alert(
                      "Terms & Conditions page can be added here."
                    )
                  }
                >
                  Terms & Conditions
                  <span>›</span>
                </button>
              </div>
            </div>

            <BottomNav page={page} setPage={setPage} />
          </section>
        )}

        {/* ==================================================
            PAGE 9 - HELP & SUPPORT
        ================================================== */}

        {page === "help" && (
          <section className="screen app-page">
            <header className="top-header">
              <Logo compact />
            </header>

            <div className="page-content">
              <div className="subpage-title">
                <button onClick={() => setPage("profile")}>
                  ←
                </button>

                <div>
                  <h1>Help & Support</h1>
                  <p>How can we help you?</p>
                </div>
              </div>

              <div className="help-section">
                <h3>Common Questions</h3>

                {[
                  {
                    q: "How do I list a product?",
                    a: "Open the Sell tab, upload a photo, add product information and click List Product.",
                  },
                  {
                    q: "Is Farmer ID compulsory?",
                    a: "No. Farmer ID is optional.",
                  },
                  {
                    q: "Where can I check my orders?",
                    a: "Go to the Orders tab from the bottom navigation.",
                  },
                ].map((item, index) => (
                  <div className="faq-item" key={item.q}>
                    <button
                      onClick={() =>
                        setFaqOpen(
                          faqOpen === index
                            ? null
                            : index
                        )
                      }
                    >
                      <span>{item.q}</span>
                      <span>
                        {faqOpen === index
                          ? "−"
                          : "+"}
                      </span>
                    </button>

                    {faqOpen === index && (
                      <p>{item.a}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="help-section">
                <h3>Contact Support</h3>

                <button
                  className="contact-item"
                  onClick={() =>
                    (window.location.href =
                      "mailto:support@fasalbridge.com")
                  }
                >
                  <span>✉ Email Support</span>
                  <span>›</span>
                </button>

                <button
                  className="contact-item"
                  onClick={() =>
                    (window.location.href =
                      "tel:+911234567890")
                  }
                >
                  <span>☎ Call Support</span>
                  <span>›</span>
                </button>
              </div>
            </div>

            <BottomNav page={page} setPage={setPage} />
          </section>
        )}
      </div>
    </div>
  );
}

export default App;