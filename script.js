/* =====================================================
   FASALBRIDGE CONSUMER WEBSITE — script.js
   ===================================================== */



const DEMO_LOCATION = {
    lat: 28.6139,
    lon: 77.2090,
    label: "Delhi NCR · Demo location"
};


/* =====================================================
   APP STATE
   ===================================================== */

let currentPage     = "home";
let currentProductId = null;
let currentOrderId  = null;
let userLocation    = null;
let locationMode    = "demo";

let searchState = {
    query:    "",
    category: "All",
    sort:     "distance"
};

let cart    = JSON.parse(localStorage.getItem("fb_cart")    || "[]");
let orders  = JSON.parse(localStorage.getItem("fb_orders")  || "[]");
let language = localStorage.getItem("fb_language") || "English";


/* =====================================================
   PRODUCT DATA
   ===================================================== */

const products = [

    /* ── VEGETABLES ── */
    { id:  1, name: "Tomatoes",     category: "Vegetables", price:  30, unit: "kg",    quantity: 240, farmer: "Rajesh Kumar",   verified: true,  rating: 4.8, location: "Sonipat",    image: "images/tomato.jpg",      lat: 28.9931, lon: 77.0151, harvested: "10 Sept 2026", freshness: 92 },
    { id:  2, name: "Tomatoes",     category: "Vegetables", price:  34, unit: "kg",    quantity: 150, farmer: "Amit Sharma",    verified: false, rating: 4.5, location: "Rohtak",     image: "images/tomato.jpg",      lat: 28.8955, lon: 76.6066, harvested: "9 Sept 2026",  freshness: 88 },
    { id:  3, name: "Potatoes",     category: "Vegetables", price:  24, unit: "kg",    quantity: 500, farmer: "Suresh Verma",   verified: true,  rating: 4.7, location: "Panipat",    image: "images/potato.jpg",      lat: 29.3909, lon: 76.9635, harvested: "7 Sept 2026",  freshness: 90 },
    { id:  4, name: "Potatoes",     category: "Vegetables", price:  27, unit: "kg",    quantity: 320, farmer: "Mohan Singh",    verified: false, rating: 4.4, location: "Karnal",     image: "images/potato.jpg",      lat: 29.6857, lon: 76.9905, harvested: "6 Sept 2026",  freshness: 86 },
    { id:  5, name: "Onions",       category: "Vegetables", price:  28, unit: "kg",    quantity: 300, farmer: "Vikas Malik",    verified: true,  rating: 4.9, location: "Baghpat",    image: "images/onion.jpg",       lat: 28.9441, lon: 77.2189, harvested: "8 Sept 2026",  freshness: 91 },
    { id:  6, name: "Onions",       category: "Vegetables", price:  31, unit: "kg",    quantity: 210, farmer: "Rohit Kumar",    verified: false, rating: 4.3, location: "Meerut",     image: "images/onion.jpg",       lat: 28.9845, lon: 77.7064, harvested: "7 Sept 2026",  freshness: 84 },
    { id:  7, name: "Spinach",      category: "Vegetables", price:  35, unit: "kg",    quantity:  90, farmer: "Pawan Yadav",    verified: true,  rating: 4.8, location: "Bahadurgarh",image: "images/spinach.jpg",     lat: 28.6920, lon: 76.9310, harvested: "11 Sept 2026", freshness: 96 },
    { id:  8, name: "Spinach",      category: "Vegetables", price:  32, unit: "kg",    quantity:  70, farmer: "Deepak Rao",     verified: false, rating: 4.4, location: "Jhajjar",    image: "images/spinach.jpg",     lat: 28.6063, lon: 76.6561, harvested: "10 Sept 2026", freshness: 93 },
    { id:  9, name: "Carrots",      category: "Vegetables", price:  40, unit: "kg",    quantity: 180, farmer: "Manoj Dahiya",   verified: true,  rating: 4.7, location: "Jhajjar",    image: "images/carrot.jpg",      lat: 28.6063, lon: 76.6561, harvested: "8 Sept 2026",  freshness: 89 },
    { id: 10, name: "Carrots",      category: "Vegetables", price:  37, unit: "kg",    quantity: 250, farmer: "Rakesh Kumar",   verified: false, rating: 4.2, location: "Sonipat",    image: "images/carrot.jpg",      lat: 28.9931, lon: 77.0151, harvested: "7 Sept 2026",  freshness: 87 },
    { id: 11, name: "Cauliflower",  category: "Vegetables", price:  42, unit: "kg",    quantity: 130, farmer: "Nitin Hooda",    verified: true,  rating: 4.8, location: "Sonipat",    image: "images/cauliflower.jpg", lat: 28.9931, lon: 77.0151, harvested: "10 Sept 2026", freshness: 94 },
    { id: 12, name: "Cauliflower",  category: "Vegetables", price:  38, unit: "kg",    quantity: 160, farmer: "Ravi Kumar",     verified: false, rating: 4.5, location: "Karnal",     image: "images/cauliflower.jpg", lat: 29.6857, lon: 76.9905, harvested: "8 Sept 2026",  freshness: 89 },
    { id: 13, name: "Capsicum",     category: "Vegetables", price:  60, unit: "kg",    quantity: 100, farmer: "Arjun Mehta",    verified: true,  rating: 4.9, location: "Gurugram",   image: "images/capsicum.jpg",    lat: 28.4595, lon: 77.0266, harvested: "10 Sept 2026", freshness: 95 },
    { id: 14, name: "Capsicum",     category: "Vegetables", price:  56, unit: "kg",    quantity:  80, farmer: "Karan Singh",    verified: false, rating: 4.3, location: "Rohtak",     image: "images/capsicum.jpg",    lat: 28.8955, lon: 76.6066, harvested: "9 Sept 2026",  freshness: 90 },
    { id: 15, name: "Brinjal",      category: "Vegetables", price:  34, unit: "kg",    quantity: 170, farmer: "Ajay Kumar",     verified: true,  rating: 4.6, location: "Baghpat",    image: "images/brinjal.jpg",     lat: 28.9441, lon: 77.2189, harvested: "9 Sept 2026",  freshness: 92 },
    { id: 16, name: "Brinjal",      category: "Vegetables", price:  31, unit: "kg",    quantity: 140, farmer: "Sunil Yadav",    verified: false, rating: 4.2, location: "Panipat",    image: "images/brinjal.jpg",     lat: 29.3909, lon: 76.9635, harvested: "8 Sept 2026",  freshness: 87 },
    { id: 17, name: "Okra",         category: "Vegetables", price:  48, unit: "kg",    quantity:  95, farmer: "Vijay Malik",    verified: true,  rating: 4.8, location: "Meerut",     image: "images/okra.jpg",        lat: 28.9845, lon: 77.7064, harvested: "11 Sept 2026", freshness: 97 },
    { id: 18, name: "Okra",         category: "Vegetables", price:  45, unit: "kg",    quantity: 110, farmer: "Aakash Verma",   verified: false, rating: 4.4, location: "Sonipat",    image: "images/okra.jpg",        lat: 28.9931, lon: 77.0151, harvested: "10 Sept 2026", freshness: 94 },
    { id: 19, name: "Cabbage",      category: "Vegetables", price:  30, unit: "kg",    quantity: 260, farmer: "Harish Kumar",   verified: true,  rating: 4.7, location: "Panipat",    image: "images/cabbage.jpg",     lat: 29.3909, lon: 76.9635, harvested: "8 Sept 2026",  freshness: 90 },
    { id: 20, name: "Cabbage",      category: "Vegetables", price:  28, unit: "kg",    quantity: 300, farmer: "Dinesh Sharma",  verified: false, rating: 4.3, location: "Karnal",     image: "images/cabbage.jpg",     lat: 29.6857, lon: 76.9905, harvested: "7 Sept 2026",  freshness: 87 },

    /* ── FRUITS ── */
    { id: 21, name: "Mangoes",      category: "Fruits",     price:  85, unit: "kg",    quantity: 140, farmer: "Imran Khan",     verified: true,  rating: 4.9, location: "Saharanpur", image: "images/mango.jpg",       lat: 29.9680, lon: 77.5552, harvested: "8 Sept 2026",  freshness: 91 },
    { id: 22, name: "Mangoes",      category: "Fruits",     price:  90, unit: "kg",    quantity:  90, farmer: "Rajiv Singh",    verified: false, rating: 4.4, location: "Meerut",     image: "images/mango.jpg",       lat: 28.9845, lon: 77.7064, harvested: "7 Sept 2026",  freshness: 87 },
    { id: 23, name: "Bananas",      category: "Fruits",     price:  45, unit: "dozen", quantity: 120, farmer: "Mukul Sharma",   verified: true,  rating: 4.8, location: "Hapur",      image: "images/banana.jpg",      lat: 28.7306, lon: 77.7759, harvested: "9 Sept 2026",  freshness: 93 },
    { id: 24, name: "Bananas",      category: "Fruits",     price:  48, unit: "dozen", quantity: 100, farmer: "Anil Kumar",     verified: false, rating: 4.2, location: "Baghpat",    image: "images/banana.jpg",      lat: 28.9441, lon: 77.2189, harvested: "8 Sept 2026",  freshness: 90 },
    { id: 25, name: "Apples",       category: "Fruits",     price: 120, unit: "kg",    quantity: 100, farmer: "Devendra Singh", verified: true,  rating: 4.9, location: "Shimla",     image: "images/apple.jpg",       lat: 31.1048, lon: 77.1734, harvested: "5 Sept 2026",  freshness: 89 },
    { id: 26, name: "Apples",       category: "Fruits",     price: 135, unit: "kg",    quantity:  80, farmer: "Ramesh Thakur",  verified: false, rating: 4.4, location: "Dehradun",   image: "images/apple.jpg",       lat: 30.3165, lon: 78.0322, harvested: "4 Sept 2026",  freshness: 85 },
    { id: 27, name: "Guava",        category: "Fruits",     price:  65, unit: "kg",    quantity: 120, farmer: "Ashok Kumar",    verified: true,  rating: 4.7, location: "Sonipat",    image: "images/guava.jpg",       lat: 28.9931, lon: 77.0151, harvested: "10 Sept 2026", freshness: 95 },
    { id: 28, name: "Guava",        category: "Fruits",     price:  60, unit: "kg",    quantity: 100, farmer: "Mahesh Yadav",   verified: false, rating: 4.3, location: "Baghpat",    image: "images/guava.jpg",       lat: 28.9441, lon: 77.2189, harvested: "9 Sept 2026",  freshness: 91 },
    { id: 29, name: "Oranges",      category: "Fruits",     price:  75, unit: "kg",    quantity: 140, farmer: "Sanjay Kumar",   verified: true,  rating: 4.8, location: "Saharanpur", image: "images/orange.jpg",      lat: 29.9680, lon: 77.5552, harvested: "7 Sept 2026",  freshness: 90 },
    { id: 30, name: "Oranges",      category: "Fruits",     price:  72, unit: "kg",    quantity: 110, farmer: "Vivek Sharma",   verified: false, rating: 4.2, location: "Meerut",     image: "images/orange.jpg",      lat: 28.9845, lon: 77.7064, harvested: "6 Sept 2026",  freshness: 87 },
    { id: 31, name: "Papaya",       category: "Fruits",     price:  50, unit: "kg",    quantity: 100, farmer: "Gaurav Singh",   verified: true,  rating: 4.7, location: "Sonipat",    image: "images/papaya.jpg",      lat: 28.9931, lon: 77.0151, harvested: "10 Sept 2026", freshness: 94 },
    { id: 32, name: "Papaya",       category: "Fruits",     price:  46, unit: "kg",    quantity:  90, farmer: "Naveen Kumar",   verified: false, rating: 4.4, location: "Rohtak",     image: "images/papaya.jpg",      lat: 28.8955, lon: 76.6066, harvested: "9 Sept 2026",  freshness: 90 },

    /* ── CROPS ── */
    { id: 33, name: "Basmati Rice", category: "Crops",      price:  95, unit: "kg",    quantity: 500, farmer: "Balraj Singh",   verified: true,  rating: 4.9, location: "Karnal",     image: "images/rice.jpg",        lat: 29.6857, lon: 76.9905, harvested: "2 Sept 2026",  freshness: 96 },
    { id: 34, name: "Basmati Rice", category: "Crops",      price:  98, unit: "kg",    quantity: 400, farmer: "Surender Malik", verified: false, rating: 4.5, location: "Panipat",    image: "images/rice.jpg",        lat: 29.3909, lon: 76.9635, harvested: "1 Sept 2026",  freshness: 93 },
    { id: 35, name: "Wheat",        category: "Crops",      price:  38, unit: "kg",    quantity: 800, farmer: "Om Prakash",     verified: true,  rating: 4.8, location: "Sonipat",    image: "images/wheat.jpg",       lat: 28.9931, lon: 77.0151, harvested: "28 Aug 2026",  freshness: 94 },
    { id: 36, name: "Wheat",        category: "Crops",      price:  36, unit: "kg",    quantity: 700, farmer: "Raj Kumar",      verified: false, rating: 4.3, location: "Rohtak",     image: "images/wheat.jpg",       lat: 28.8955, lon: 76.6066, harvested: "27 Aug 2026",  freshness: 91 },
    { id: 37, name: "Maize",        category: "Crops",      price:  28, unit: "kg",    quantity: 600, farmer: "Mukesh Kumar",   verified: true,  rating: 4.7, location: "Panipat",    image: "images/maize.jpg",       lat: 29.3909, lon: 76.9635, harvested: "1 Sept 2026",  freshness: 94 },
    { id: 38, name: "Maize",        category: "Crops",      price:  30, unit: "kg",    quantity: 550, farmer: "Pritam Singh",   verified: false, rating: 4.4, location: "Karnal",     image: "images/maize.jpg",       lat: 29.6857, lon: 76.9905, harvested: "30 Aug 2026",  freshness: 91 },
    { id: 39, name: "Mustard",      category: "Crops",      price:  72, unit: "kg",    quantity: 400, farmer: "Raghav Sharma",  verified: true,  rating: 4.8, location: "Jhajjar",    image: "images/mustard.jpg",     lat: 28.6063, lon: 76.6561, harvested: "25 Aug 2026",  freshness: 95 },
    { id: 40, name: "Mustard",      category: "Crops",      price:  75, unit: "kg",    quantity: 350, farmer: "Naresh Yadav",   verified: false, rating: 4.2, location: "Rewari",     image: "images/mustard.jpg",     lat: 28.1920, lon: 76.6192, harvested: "24 Aug 2026",  freshness: 92 },
    { id: 41, name: "Bajra",        category: "Crops",      price:  34, unit: "kg",    quantity: 450, farmer: "Kishan Singh",   verified: true,  rating: 4.7, location: "Rewari",     image: "images/bajra.jpg",       lat: 28.1920, lon: 76.6192, harvested: "28 Aug 2026",  freshness: 94 },
    { id: 42, name: "Bajra",        category: "Crops",      price:  32, unit: "kg",    quantity: 380, farmer: "Ramesh Kumar",   verified: false, rating: 4.3, location: "Jhajjar",    image: "images/bajra.jpg",       lat: 28.6063, lon: 76.6561, harvested: "27 Aug 2026",  freshness: 90 },
    { id: 43, name: "Chickpeas",    category: "Crops",      price:  88, unit: "kg",    quantity: 300, farmer: "Madan Lal",      verified: true,  rating: 4.8, location: "Alwar",      image: "images/chickpeas.jpg",   lat: 27.5530, lon: 76.6346, harvested: "22 Aug 2026",  freshness: 94 },
    { id: 44, name: "Chickpeas",    category: "Crops",      price:  92, unit: "kg",    quantity: 250, farmer: "Dharam Singh",   verified: false, rating: 4.3, location: "Rohtak",     image: "images/chickpeas.jpg",   lat: 28.8955, lon: 76.6066, harvested: "21 Aug 2026",  freshness: 90 }
];


/* =====================================================
   LANGUAGES & TRANSLATIONS
   ===================================================== */

const fbLanguages = [
    { code: "English",  native: "English"   },
    { code: "Hindi",    native: "हिंदी"      },
    { code: "Marathi",  native: "मराठी"      },
    { code: "Bengali",  native: "বাংলা"      },
    { code: "Assamese", native: "অসমীয়া"    }
];

const fbCopy = {
    English: {
        home: "Home", orders: "Orders", profile: "Profile", cart: "Cart",
        categories: "Categories",
        location: "Showing produce near you",
        enable: "Enable location",
        unavailable: "Location unavailable — enable location to find nearby farmers",
        search: "Search fruits, vegetables, crops, farmers or places…",
        nearby: "Fresh near you", recommendations: "Recommended for you",
        view: "View", add: "Add to cart",
        farmer: "Farmer", verified: "Verified Farmer",
        rating: "Rating: Not available",
        forecast: "Demand & price forecast",
        prototype: "Prototype forecast · simulated demo values",
        category: "Shop by category",
        all: "All", vegetables: "Vegetables", fruits: "Fruits", crops: "Crops",
        results: "listings from farmers", noResults: "No listings found",
        didYouMean: "Did you mean", freshness: "Freshness",
        harvest: "Harvested", available: "Available",
        comparison: "Compare farmers",
        map: "Approximate farmer locations", journey: "Farm journey",
        why: "Why FasalBridge?", tracking: "Track order",
        checkout: "Place demo order", subtotal: "Subtotal",
        delivery: "Delivery", total: "Total", remove: "Remove",
        quantity: "Quantity", language: "Language",
        settings: "Location settings", items: "Items",
        orderPlaced: "Demo order placed",
        identity: "Farmer identity verified",
        mapUnavailable: "Map could not load. Listing locations remain available below."
    },
    Hindi: {
        home: "होम", orders: "ऑर्डर", profile: "प्रोफ़ाइल", cart: "कार्ट",
        categories: "श्रेणियाँ",
        location: "आपके आस-पास की उपज दिखाई जा रही है",
        enable: "स्थान चालू करें",
        unavailable: "स्थान उपलब्ध नहीं है — पास के किसानों को खोजने के लिए स्थान चालू करें",
        search: "फल, सब्ज़ियाँ, फसलें, किसान या स्थान खोजें…",
        nearby: "आपके आस-पास ताज़ा", recommendations: "आपके लिए सुझाव",
        view: "देखें", add: "कार्ट में डालें",
        farmer: "किसान", verified: "सत्यापित किसान",
        rating: "रेटिंग: उपलब्ध नहीं",
        forecast: "मांग और कीमत पूर्वानुमान",
        prototype: "प्रोटोटाइप पूर्वानुमान · सिम्युलेटेड डेमो मान",
        category: "श्रेणी से खरीदें",
        all: "सभी", vegetables: "सब्ज़ियाँ", fruits: "फल", crops: "फसलें",
        results: "किसानों की लिस्टिंग", noResults: "कोई लिस्टिंग नहीं मिली",
        didYouMean: "क्या आपका मतलब था", freshness: "ताज़गी",
        harvest: "कटाई", available: "उपलब्ध",
        comparison: "किसानों की तुलना",
        map: "किसानों के अनुमानित स्थान", journey: "खेत की यात्रा",
        why: "FasalBridge से क्यों खरीदें", tracking: "ऑर्डर ट्रैक करें",
        checkout: "डेमो ऑर्डर दें", subtotal: "उप-योग",
        delivery: "डिलीवरी", total: "कुल", remove: "हटाएँ",
        quantity: "मात्रा", language: "भाषा",
        settings: "स्थान सेटिंग", items: "आइटम",
        orderPlaced: "डेमो ऑर्डर हो गया",
        identity: "किसान की पहचान सत्यापित",
        mapUnavailable: "नक्शा लोड नहीं हो सका। लिस्टिंग के स्थान नीचे उपलब्ध हैं।"
    },
    Marathi: {
        home: "मुख्यपृष्ठ", orders: "ऑर्डर", profile: "प्रोफाइल", cart: "कार्ट",
        categories: "श्रेणी",
        location: "तुमच्या जवळचे उत्पादन दाखवत आहे",
        enable: "स्थान सक्षम करा",
        unavailable: "स्थान उपलब्ध नाही — जवळचे शेतकरी शोधण्यासाठी स्थान सक्षम करा",
        search: "फळे, भाज्या, पिके, शेतकरी किंवा ठिकाणे शोधा…",
        nearby: "तुमच्या जवळचे ताजे", recommendations: "तुमच्यासाठी शिफारसी",
        view: "पहा", add: "कार्टमध्ये जोडा",
        farmer: "शेतकरी", verified: "सत्यापित शेतकरी",
        rating: "रेटिंग: उपलब्ध नाही",
        forecast: "मागणी व किंमत अंदाज",
        prototype: "प्रोटोटाइप अंदाज · प्रात्यक्षिक मूल्ये",
        category: "श्रेणीनुसार खरेदी करा",
        all: "सर्व", vegetables: "भाज्या", fruits: "फळे", crops: "पिके",
        results: "शेतकऱ्यांच्या लिस्टिंग", noResults: "लिस्टिंग सापडली नाही",
        didYouMean: "तुम्हाला म्हणायचे होते का", freshness: "ताजेपणा",
        harvest: "काढणी", available: "उपलब्ध",
        comparison: "शेतकऱ्यांची तुलना",
        map: "शेतकऱ्यांची अंदाजे ठिकाणे", journey: "शेतीचा प्रवास",
        why: "FasalBridge मधून का खरेदी करावी", tracking: "ऑर्डर ट्रॅक करा",
        checkout: "डेमो ऑर्डर करा", subtotal: "उपएकूण",
        delivery: "वितरण", total: "एकूण", remove: "काढा",
        quantity: "प्रमाण", language: "भाषा",
        settings: "स्थान सेटिंग", items: "वस्तू",
        orderPlaced: "डेमो ऑर्डर केली",
        identity: "शेतकरी ओळख सत्यापित",
        mapUnavailable: "नकाशा लोड झाला नाही. लिस्टिंगची ठिकाणे खाली उपलब्ध आहेत."
    },
    Bengali: {
        home: "হোম", orders: "অর্ডার", profile: "প্রোফাইল", cart: "কার্ট",
        categories: "বিভাগ",
        location: "আপনার কাছাকাছি পণ্য দেখানো হচ্ছে",
        enable: "অবস্থান চালু করুন",
        unavailable: "অবস্থান পাওয়া যায়নি — কাছের কৃষক খুঁজে পেতে অবস্থান চালু করুন",
        search: "ফল, সবজি, ফসল, কৃষক বা স্থান খুঁজুন…",
        nearby: "আপনার কাছে টাটকা", recommendations: "আপনার জন্য পরামর্শ",
        view: "দেখুন", add: "কার্টে যোগ করুন",
        farmer: "কৃষক", verified: "যাচাইকৃত কৃষক",
        rating: "রেটিং: উপলব্ধ নয়",
        forecast: "চাহিদা ও দাম পূর্বাভাস",
        prototype: "প্রোটোটাইপ পূর্বাভাস · সিমুলেটেড ডেমো মান",
        category: "বিভাগ অনুযায়ী কিনুন",
        all: "সব", vegetables: "সবজি", fruits: "ফল", crops: "ফসল",
        results: "কৃষকদের লিস্টিং", noResults: "কোনো লিস্টিং নেই",
        didYouMean: "আপনি কি বোঝাতে চেয়েছেন", freshness: "সতেজতা",
        harvest: "ফসল তোলা", available: "উপলব্ধ",
        comparison: "কৃষকদের তুলনা করুন",
        map: "কৃষকদের আনুমানিক অবস্থান", journey: "খামারের যাত্রা",
        why: "FasalBridge থেকে কেন কিনবেন", tracking: "অর্ডার ট্র্যাক করুন",
        checkout: "ডেমো অর্ডার করুন", subtotal: "উপমোট",
        delivery: "ডেলিভারি", total: "মোট", remove: "সরান",
        quantity: "পরিমাণ", language: "ভাষা",
        settings: "অবস্থান সেটিং", items: "আইটেম",
        orderPlaced: "ডেমো অর্ডার করা হয়েছে",
        identity: "কৃষকের পরিচয় যাচাইকৃত",
        mapUnavailable: "মানচিত্র লোড হয়নি। নিচে লিস্টিং-এর অবস্থান পাওয়া যাবে।"
    },
    Assamese: {
        home: "হোম", orders: "অৰ্ডাৰ", profile: "প্ৰ'ফাইল", cart: "কাৰ্ট",
        categories: "শ্ৰেণী",
        location: "আপোনাৰ ওচৰৰ উৎপাদন দেখুওৱা হৈছে",
        enable: "অৱস্থান সক্ষম কৰক",
        unavailable: "অৱস্থান উপলব্ধ নহয় — ওচৰৰ কৃষক বিচাৰিবলৈ অৱস্থান সক্ষম কৰক",
        search: "ফল, শাক-পাচলি, শস্য, কৃষক বা ঠাই বিচাৰক…",
        nearby: "আপোনাৰ ওচৰত সতেজ", recommendations: "আপোনাৰ বাবে পৰামৰ্শ",
        view: "চাওক", add: "কাৰ্টত যোগ কৰক",
        farmer: "কৃষক", verified: "যাচাইকৃত কৃষক",
        rating: "ৰেটিং: উপলব্ধ নহয়",
        forecast: "চাহিদা আৰু মূল্যৰ পূৰ্বানুমান",
        prototype: "প্ৰ'ট'টাইপ পূৰ্বানুমান · অনুকৰণিত ডেমো মান",
        category: "শ্ৰেণী অনুসৰি কিনক",
        all: "সকলো", vegetables: "শাক-পাচলি", fruits: "ফল", crops: "শস্য",
        results: "কৃষকসকলৰ তালিকা", noResults: "কোনো তালিকা পোৱা নগ'ল",
        didYouMean: "আপুনি বুজাইছিল নেকি", freshness: "সতেজতা",
        harvest: "চপোৱা", available: "উপলব্ধ",
        comparison: "কৃষকৰ তুলনা কৰক",
        map: "কৃষকসকলৰ আনুমানিক অৱস্থান", journey: "খেতিৰ যাত্ৰা",
        why: "FasalBridge-ৰ পৰা কিয় কিনিব", tracking: "অৰ্ডাৰ অনুসৰণ কৰক",
        checkout: "ডেমো অৰ্ডাৰ কৰক", subtotal: "উপমুঠ",
        delivery: "ডেলিভাৰী", total: "মুঠ", remove: "আঁতৰাওক",
        quantity: "পৰিমাণ", language: "ভাষা",
        settings: "অৱস্থান ছেটিং", items: "বস্তু",
        orderPlaced: "ডেমো অৰ্ডাৰ কৰা হ'ল",
        identity: "কৃষকৰ পৰিচয় যাচাইকৃত",
        mapUnavailable: "মানচিত্ৰ লোড নহ'ল। তালিকাৰ অৱস্থান তলত উপলব্ধ।"
    }
};

function fbT(key) {
    const table = fbCopy[language] || fbCopy.English;
    return table[key] || fbCopy.English[key] || key;
}


/* =====================================================
   PRODUCE NAME ALIASES
   ===================================================== */

const fbAliases = {
    Tomatoes:    ["tomato","tamatar","टमाटर","टोमॅटो","টমেটো"],
    Potatoes:    ["potato","potatoe","aloo","alu","आलू","আলু"],
    Onions:      ["onion","onoin","pyaaz","pyaz","प्याज","পেঁয়াজ"],
    Spinach:     ["palak","पालक","পালং"],
    Carrots:     ["carrot","gajar","गाजर"],
    Cauliflower: ["gobhi","phool gobhi","गोभी"],
    Capsicum:    ["shimla mirch","शिमला मिर्च"],
    Brinjal:     ["eggplant","baingan","बैंगन"],
    Okra:        ["lady finger","ladyfinger","bhindi","bhendi","भिंडी"],
    Cabbage:     ["patta gobhi","पत्तागोभी"],
    Mangoes:     ["mango","aam","आम"],
    Bananas:     ["banana","kela","केला"],
    Basmati:     ["rice","chawal","चावल","ধান"],
    Wheat:       ["gehu","gehun","गेहूं"],
    Maize:       ["corn","makka","मक्का"],
    Chickpeas:   ["chana","चना"]
};

const fbStages = [
    "Order confirmed",
    "Farmer preparing produce",
    "Collected at hub",
    "In transit",
    "Out for delivery",
    "Delivered"
];

let fbDetailQuantity = 1;
let fbSuggestedQuery  = "";


/* =====================================================
   BASIC HELPERS
   ===================================================== */

function getProduct(id) {
    return products.find(p => p.id === Number(id));
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g,  "&amp;")
        .replace(/</g,  "&lt;")
        .replace(/>/g,  "&gt;")
        .replace(/"/g,  "&quot;")
        .replace(/'/g,  "&#039;");
}

function formatDistance(km) {
    return km < 1
        ? `${Math.round(km * 1000)} m`
        : `${km.toFixed(1)} km`;
}

function getInitials(name) {
    return name.split(" ").map(p => p.charAt(0)).slice(0, 2).join("").toUpperCase();
}

function saveData() {
    localStorage.setItem("fb_cart",     JSON.stringify(cart));
    localStorage.setItem("fb_orders",   JSON.stringify(orders));
    localStorage.setItem("fb_language", language);
    localStorage.removeItem("fb_wishlist");
}


/* =====================================================
   TOAST
   ===================================================== */

function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}


/* =====================================================
   CART COUNT
   ===================================================== */

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const el = document.getElementById("count");
    if (el) el.textContent = count;
}


/* =====================================================
   NAV LABELS  (header + bottom nav — called on load and language change)
   ===================================================== */

function updateNavLabels() {
    // Home link
    document.querySelectorAll(".header-link.home-link")
        .forEach(el => el.textContent = fbT("home"));

    // Orders + Profile in header
    const navKeys = ["orders", "profile"];
    document.querySelectorAll(".header-actions .header-link")
        .forEach((el, i) => { if (navKeys[i]) el.textContent = fbT(navKeys[i]); });

    // Cart label
    const cartText = document.querySelector(".cart-button span:not([aria-hidden])");
    if (cartText) cartText.textContent = fbT("cart");

    // Search placeholder
    const input = document.getElementById("headerSearchInput");
    if (input) input.placeholder = fbT("search");

    // Header category dropdown — keep values in English for filter logic
    const optionKeys   = ["all", "vegetables", "fruits", "crops"];
    const optionValues = ["All", "Vegetables",  "Fruits", "Crops"];
    document.querySelectorAll("#headerCategory option")
        .forEach((opt, i) => {
            opt.textContent = fbT(optionKeys[i]);
            opt.value = optionValues[i];
        });

    // Bottom nav
    const icons    = ["⌂", "☷",             "▣",      "○"];
    const bnKeys   = ["home", "categories", "orders", "profile"];
    document.querySelectorAll(".bottom-nav button")
        .forEach((btn, i) => {
            btn.innerHTML = `<span aria-hidden="true">${icons[i]}</span>${fbT(bnKeys[i])}`;
        });
}


/* =====================================================
   LOCATION
   ===================================================== */

function distanceKm(product) {
    const origin = userLocation || DEMO_LOCATION;
    const r = Math.PI / 180;
    const dLat = (product.lat - origin.lat) * r;
    const dLon = (product.lon - origin.lon) * r;
    const a = Math.sin(dLat / 2) ** 2
        + Math.cos(origin.lat * r) * Math.cos(product.lat * r) * Math.sin(dLon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function locationLabel() {
    if (userLocation?.label) return userLocation.label;
    return locationMode === "denied"
        ? fbT("unavailable")
        : "Set Location";
}

async function fbReverseGeocode(lat, lon) {
    try {
        const res  = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&zoom=10`,
            { headers: { Accept: "application/json" } }
        );
        const data = await res.json();
        const addr = data.address || {};
        const city = addr.city || addr.town || addr.village || addr.county || addr.state_district;
        return city && addr.state ? `${city}, ${addr.state}` : "Location enabled — locality unavailable";
    } catch {
        return "Location enabled — locality unavailable";
    }
}

function updateHeaderLocation() {
    const el = document.getElementById("headerLocation");
    if (!el) return;

    el.textContent = locationLabel();
}

function useMyLocation() {
    if (!navigator.geolocation) {
        locationMode = "denied";
        updateHeaderLocation();
        showToast("Location is not supported in this browser.");
        return;
    }

    showToast("Requesting location permission…");

    navigator.geolocation.getCurrentPosition(
        async position => {

            userLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                label: "Finding your locality…"
            };

            locationMode = "live";

            // Show temporary state immediately
            updateHeaderLocation();

            try {
                userLocation.label = await fbReverseGeocode(
                    userLocation.lat,
                    userLocation.lon
                );
            } catch (error) {
                console.error("Reverse geocoding failed:", error);
                userLocation.label = "Location found";
            }

            // IMPORTANT: update the header after getting the actual location
            updateHeaderLocation();

            showToast("Location updated.");
        },

        error => {
            console.error("Geolocation error:", error);

            userLocation = null;
            locationMode = "denied";

            updateHeaderLocation();

            showToast("Location permission was not granted.");
        },

        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}


/* =====================================================
   NAVIGATION
   ===================================================== */

function show(page, data = null) {
    currentPage = page;
    if (page === "product") currentProductId = Number(data);
    if (page === "track")   currentOrderId   = String(data);

    const renderer = {
    home:       renderHome,
    search:     renderSearchPage,
    product:    renderProductPage,
    cart:       renderCart,
    orders:     renderOrders,
    track:      renderTracking,
    categories: renderCategories,
    profile:    renderProfile,
    bulk:       renderBulkOrder
}[page] || renderHome;

    renderer();
    requestAnimationFrame(() =>
        document.getElementById("main")?.focus({ preventScroll: true })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
}


/* =====================================================
   SEARCH BAR
   ===================================================== */

function headerSearch(event) {
    event?.preventDefault();
    searchState.query    = document.getElementById("headerSearchInput")?.value.trim() || "";
    searchState.category = document.getElementById("headerCategory")?.value || "All";
    searchState.sort     = "distance";
    show("search");
}

function headerVoiceSearch() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
        showToast("Voice search is not available in this browser. Please type your search.");
        return;
    }
    const recognition  = new Recognition();
    recognition.lang   = language === "Hindi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.onstart  = () => showToast("Listening…");
    recognition.onresult = event => {
        const input = document.getElementById("headerSearchInput");
        if (input) input.value = event.results[0][0].transcript;
        headerSearch();
    };
    recognition.onerror  = () => showToast("We could not understand that. Please try again.");
    recognition.start();
}


/* =====================================================
   FUZZY SEARCH
   ===================================================== */

function fbNorm(value) {
    return String(value || "")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim();
}

function fbSingular(value) {
    return fbNorm(value).replace(/(oes|ies|s)$/u, e =>
        e === "ies" ? "y" : e === "oes" ? "o" : "");
}

function fbEditDistance(a, b) {
    const aa = fbNorm(a), bb = fbNorm(b);
    const row = Array.from({ length: bb.length + 1 }, (_, i) => i);
    for (let i = 1; i <= aa.length; i++) {
        let last = i - 1; row[0] = i;
        for (let j = 1; j <= bb.length; j++) {
            const old = row[j];
            row[j] = Math.min(row[j] + 1, row[j-1] + 1, last + (aa[i-1] === bb[j-1] ? 0 : 1));
            last = old;
        }
    }
    return row[bb.length];
}

function fbAliasesFor(product) {
    const base = [product.name, product.name.replace(/s$/u,""), product.category, product.farmer, product.location];
    Object.entries(fbAliases).forEach(([name, aliases]) => {
        if (product.name.toLowerCase().includes(name.toLowerCase())) base.push(...aliases);
    });
    return base;
}

function fbMatch(product, query) {

    const needle = fbSingular(query);

    if (!needle) {
        return {
            matched: true,
            score: 1
        };
    }

    const terms = fbAliasesFor(product)
        .map(fbSingular)
        .filter(Boolean);

    // Exact match
    if (terms.includes(needle)) {
        return {
            matched: true,
            score: 1
        };
    }

    // Partial match
    if (terms.some(term =>
        term.includes(needle) || needle.includes(term)
    )) {
        return {
            matched: true,
            score: 0.8
        };
    }

    // Small typo tolerance
    const score = Math.min(
        ...terms.map(term =>
            fbEditDistance(needle, term) /
            Math.max(needle.length, term.length)
        )
    );

    return {
        matched: score <= 0.2,
        score: 1 - score
    };
}

function fbSearch(query, category) {
    return products.filter(p =>
        (category === "All" || p.category === category) && fbMatch(p, query).matched
    );
}

/* =====================================================
   PRODUCT CARD
   ===================================================== */

function fbListing(product) {
    return `
        <article class="product-card"
                 id="listing-${product.id}"
                 onclick="show('product', ${product.id})">

            <div class="product-image-wrap">
                <img class="product-image"
                     src="${product.image}"
                     alt="${escapeHTML(product.name)}"
                     onerror="this.classList.add('image-missing')">
            </div>

            <div class="product-body">

                <p class="eyebrow">
                    ${escapeHTML(product.category)}
                </p>

                <h3 class="product-name">
                    ${escapeHTML(product.name)}
                </h3>

                <p class="product-location">
                    📍 ${escapeHTML(product.location)} ·
                    ${formatDistance(distanceKm(product))}
                </p>

                <div class="product-price-row">

                    <span class="product-price">
                        ₹${product.price}
                        <small> / ${product.unit}</small>
                    </span>

                    <span class="product-stock">
                        ${product.quantity} ${product.unit}
                    </span>

                </div>

                <p class="product-farmer">
                    <strong>${escapeHTML(product.farmer)}</strong>

                    ${product.verified
                        ? `<span class="identity-badge">
                            ✓ ${fbT("verified")}
                           </span>`
                        : ""}
                </p>

                <p class="rating-na">
                    ${fbT("rating")}
                </p>

                <div class="product-actions">

                    <button class="add-button"
                            type="button"
                            onclick="event.stopPropagation(); addToCart(${product.id})">
                        ${fbT("add")}
                    </button>

                </div>

            </div>
        </article>`;
}


/* =====================================================
   MAP
   ===================================================== */

function fbInitMap(items, selectedId = null) {
    const target = document.getElementById("listing-map");
    if (!target) return;
    if (!window.L) { target.innerHTML = `<p>${fbT("mapUnavailable")}</p>`; return; }

    const map = L.map(target, { scrollWheelZoom: false }).setView([28.9, 77.0], 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    const bounds = [];
    items.forEach(item => {
        const lat = Math.round((item.lat + ((item.id % 3) - 1) * 0.012) * 100) / 100;
        const lon = Math.round((item.lon + ((item.id % 3) - 1) * 0.012) * 100) / 100;
        const marker = L.marker([lat, lon]).addTo(map).bindPopup(`
            <strong>${escapeHTML(item.name)}</strong><br>
            ${escapeHTML(item.farmer)} · ${escapeHTML(item.location)}<br>
            <button type="button" onclick="show('product',${item.id})">View listing</button>`);
        marker.on("click", () =>
            document.getElementById(`listing-${item.id}`)?.classList.add("map-highlight"));
        bounds.push([lat, lon]);
        if (selectedId === item.id) marker.openPopup();
    });
    if (bounds.length > 1) map.fitBounds(bounds, { padding: [25, 25] });
    else if (bounds.length) map.setView(bounds[0], 10);
}


/* =====================================================
   HOME PAGE
   ===================================================== */

function renderHome() {
    const nearby = [...products].sort((a,b) => distanceKm(a) - distanceKm(b)).slice(0, 8);
    const recommended = [...products].sort((a,b) => b.freshness - a.freshness).slice(0, 4);
    const categories = [
        ["Vegetables", "Fresh vegetables",  "images/tomato.jpg"],
        ["Fruits",     "Fresh fruits",      "images/mango.jpg"],
        ["Crops",      "Grains & staples",  "images/rice.jpg"]
    ];

    document.getElementById("main").innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <span class="hero-tag">FARM TO HOME</span>
                <h1>Fresh produce, directly from farmers.</h1>
                <p>Discover fresh produce, compare nearby farmers, and shop directly from local farms.</p>
                <button class="hero-button" type="button" onclick="show('categories')">Explore produce</button>
            </div>
            <div class="hero-visual"><img src="images/tomato.jpg" alt="Fresh tomatoes"></div>
        </section>

        
        <section class="section">
            <div class="section-header">
                <div><h2>${fbT("nearby")}</h2><p>Listings sorted by approximate distance.</p></div>
                <button class="see-all" type="button" onclick="show('search')">See all →</button>
            </div>
            <div class="product-grid">${nearby.map(fbListing).join("")}</div>
        </section>

        <section class="section">
            <div class="section-header">
                <div><h2>${fbT("recommendations")}</h2><p>Fresh listings worth checking out</p></div>
            </div>
            <div class="product-grid">${recommended.map(fbListing).join("")}</div>
        </section>

      ${fbForecastHTML()}

<section class="section bulk-order-section">

    <div class="bulk-order-card">

        <div class="bulk-order-content">

            <span class="bulk-order-label">For large buyers</span>

            <h2>Need a large quantity?</h2>

            <p>
                FasalBridge combines produce from multiple nearby farmers
                to help fulfill large orders that one farmer may not be
                able to supply alone.
            </p>

        </div>

        <button
            class="bulk-order-button"
            type="button"
            onclick="show('bulk')"
        >
            Create Bulk Order
        </button>

    </div>

</section>

<section class="info-section why-home">

    <div class="info-section-header">
        <h3>${fbT("why")}</h3>
    </div>

    <div id="whyHome" class="info-section-content">
        <p><b>Less middlemen. Better connections. Smarter farming.</b> <br>
FasalBridge connects farmers directly with reliable buyers. <br>
From demand prediction to supply and delivery, we simplify the entire journey. <br>
<b>Fair for farmers. Reliable for buyers. </b></p>
    </div>
</section>`;
}

function fbForecastHTML() {
    const price = [24, 25, 26, 27, 27, 29, 30, 31];
    return `
        <section class="section forecast">
            <div class="section-header">
                <div><h2>${fbT("forecast")}</h2><p>Tomato: 7-day market outlook</p></div>
                <span class="demo-chip">${fbT("prototype")}</span>
            </div>
            <p>Demand is projected to rise while listed supply is below projected demand.</p>
            <div class="forecast-grid">
                <div class="demand-card">
                    <h3>Demand vs supply</h3>
                    <div class="bar-label"><span>Expected demand</span><b>2,000 kg</b></div>
                    <div class="meter"><i style="width:100%"></i></div>
                    <div class="bar-label"><span>Currently listed</span><b>1,420 kg</b></div>
                    <div class="meter supply"><i style="width:71%"></i></div>
                    <strong>Potential supply gap: 580 kg</strong>
                    <p>There may be an opportunity for farmers to supply approximately 580 kg.</p>
                </div>
                <div class="price-card">
                    <h3>Expected tomato price — next 7 days</h3>
                    <div class="chart">
                        ${price.map((v,i) => `
                            <span style="height:${(v-15)*6}px" title="Day ${i}: ₹${v}/kg">
                                <b>₹${v}</b><em>${i === 0 ? "Today" : `+${i}d`}</em>
                            </span>`).join("")}
                    </div>
                    <p>Current ₹24/kg · Expected ₹31/kg · <strong>↑ +29%</strong></p>
                </div>
            </div>
            <div class="insight">
                <strong>AI insight:</strong> Prices are projected to increase over the next 7 days.
                Farmers with harvest-ready tomatoes may benefit from delaying sale where storage allows.
            </div>
            <details>
                <summary>Why is demand expected to increase?</summary>
                <ul>
                    <li>Recent buyer demand: +12%</li>
                    <li>Seasonal pattern: High</li>
                    <li>Current listed supply: below projected demand</li>
                    <li>Nearby market demand: increasing</li>
                    <li>Price trend: upward</li>
                </ul>
            </details>
        </section>`;
}


/* =====================================================
   SEARCH PAGE
   ===================================================== */

function searchCategory(category) {
    searchState = { query: "", category, sort: "distance" };
    show("search");
}

function setCategory(category) {
    searchState.category = category;
    show("search");
}

function changeSort(sort) {
    searchState.sort = sort;
    show("search");
}

function resetSearch() {
    searchState = { query: "", category: "All", sort: "distance" };
    const input = document.getElementById("headerSearchInput");
    if (input) input.value = "";
    show("search");
}

function renderSearchPage() {
    const query = searchState.query || "";
    let results = fbSearch(query, searchState.category);

    const likelyMatch = !results.length && query
        ? products.map(p => ({ p, m: fbMatch(p, query) })).sort((a,b) => a.m.score - b.m.score)[0]
        : null;

    if (!results.length && likelyMatch?.m.score < 0.55) {
        fbSuggestedQuery = likelyMatch.p.name;
        results = fbSearch(fbSuggestedQuery, searchState.category);
    } else {
        fbSuggestedQuery = "";
    }

    const sorts = {
        distance:  (a,b) => distanceKm(a) - distanceKm(b),
        priceLow:  (a,b) => a.price - b.price,
        priceHigh: (a,b) => b.price - a.price,
        freshness: (a,b) => b.freshness - a.freshness
    };
    results.sort(sorts[searchState.sort] || sorts.distance);

    const heading = query
        ? `Results for "${escapeHTML(query)}"`
        : searchState.category === "All" ? "All produce" : searchState.category;

    document.getElementById("main").innerHTML = `
        <section class="search-heading">
            <h1>${heading}</h1>
            <p>${results.length} ${fbT("results")}</p>
            ${fbSuggestedQuery ? `
                <button class="suggestion" type="button" onclick="
                    document.getElementById('headerSearchInput').value='${fbSuggestedQuery}';
                    searchState.query='${fbSuggestedQuery}';show('search')">
                    ${fbT("didYouMean")} ${fbSuggestedQuery}?
                </button>` : ""}
        </section>

        <div class="search-controls">
            <div class="filter-buttons">
                ${["All","Vegetables","Fruits","Crops"].map(cat => `
                    <button class="filter-button ${cat === searchState.category ? "active" : ""}"
                            type="button" onclick="setCategory('${cat}')">
                        ${fbT(cat.toLowerCase())}
                    </button>`).join("")}
            </div>
            <select class="sort-select" onchange="changeSort(this.value)">
                <option value="distance">Nearest</option>
                <option value="priceLow">Lowest price</option>
                <option value="priceHigh">Highest price</option>
                <option value="freshness">Freshness</option>
            </select>
        </div>

        ${results.length ? `
            <div class="product-grid">${results.map(fbListing).join("")}</div>
        ` : `
            <div class="empty-state">
                <h2>${fbT("noResults")}</h2>
                <p>Try another spelling, a farmer, a location, or a common produce name.</p>
                <button class="green-button" type="button" onclick="resetSearch()">Browse everything</button>
            </div>`}`;

    const select = document.querySelector(".sort-select");
    if (select) select.value = searchState.sort;
    if (results.length) fbInitMap(results);
}


/* =====================================================
   PRODUCT DETAIL
   ===================================================== */

function renderProductPage() {
    const product = getProduct(currentProductId);
    if (!product) return show("home");
    fbDetailQuantity = 1;

    const peers = products
        .filter(p => p.name === product.name && p.id !== product.id)
        .sort((a,b) => distanceKm(a) - distanceKm(b));

    document.getElementById("main").innerHTML = `
        <button class="back-button" type="button" onclick="show('search')">← Back</button>

        <article class="product-detail">
            <div class="detail-image-container">
                <img class="detail-image" src="${product.image}" alt="${escapeHTML(product.name)}">
            </div>
            <div class="detail-info">
                <p class="detail-category">${escapeHTML(product.category)}</p>
                <h1 class="detail-title">${escapeHTML(product.name)}</h1>
                <p class="detail-price">₹${product.price}<span class="detail-unit"> / ${product.unit}</span></p>

                <div class="farmer-box">
                    <div class="farmer-main">
                        <div class="farmer-avatar">${getInitials(product.farmer)}</div>
                        <div>
                            <strong>${escapeHTML(product.farmer)}</strong>
                            <small>📍 ${escapeHTML(product.location)} · ${formatDistance(distanceKm(product))}</small>
                        </div>
                    </div>
                    <span class="identity-badge">
                        ${product.verified ? `✓ ${fbT("verified")}` : fbT("farmer")}
                    </span>
                </div>

                <div class="detail-info-grid">
                    <div class="info-box"><small>${fbT("available")}</small><strong>${product.quantity} ${product.unit}</strong></div>
                    <div class="info-box"><small>${fbT("harvest")}</small><strong>${product.harvested}</strong></div>
                    <div class="info-box"><small>RATING</small><strong>${fbT("rating")}</strong></div>
                    <div class="info-box"><small>DISTANCE</small><strong>${formatDistance(distanceKm(product))}</strong></div>
                </div>

                <div class="freshness">
                    <div class="freshness-header">
                        <span>${fbT("freshness")} <small>(demo estimate)</small></span>
                        <b>${product.freshness}%</b>
                    </div>
                    <div class="freshness-bar">
                        <div class="freshness-fill" style="width:${product.freshness}%"></div>
                    </div>
                </div>

                <div class="quantity-row">
                    <div class="quantity-control">
                        <button type="button" onclick="changeDetailQuantity(-1)" aria-label="Decrease">−</button>
                        <span id="detailQuantity">1</span>
                        <button type="button" onclick="changeDetailQuantity(1)"  aria-label="Increase">+</button>
                    </div>
                    <button class="big-add-button" type="button" onclick="addDetailToCart()">${fbT("add")}</button>
                </div>
            </div>
        </article>

        <section class="detail-sections">
            <article class="info-section">
                <button class="info-section-header" type="button" onclick="toggleSection('journey')">
                    <h3>${fbT("journey")} <span>+</span></h3>
                </button>
                <div id="journey" class="info-section-content" hidden>
                    <div class="journey">
                        <div class="journey-step"><i class="journey-dot"></i><strong>Grown on the farm</strong><span>${escapeHTML(product.location)}</span></div>
                        <div class="journey-step"><i class="journey-dot"></i><strong>Harvested</strong><span>${product.harvested}</span></div>
                        <div class="journey-step"><i class="journey-dot"></i><strong>${fbT("identity")}</strong><span>This badge refers only to farmer identity, not quality certification.</span></div>
                        <div class="journey-step"><i class="journey-dot"></i><strong>Listed on FasalBridge</strong><span>Available for buyer requests</span></div>
                    </div>
                </div>
            </article>

            ${peers.length ? `
                <article class="info-section">
                    <button class="info-section-header" type="button" onclick="toggleSection('compare')">
                        <h3>${fbT("comparison")} <span>+</span></h3>
                    </button>
                    <div id="compare" class="info-section-content" hidden>
                        <table class="compare-table">
                            <thead><tr><th>Farmer</th><th>Price</th><th>Qty</th><th>Distance</th><th>Freshness</th><th></th></tr></thead>
                            <tbody>
                                ${[product, ...peers].map(item => `
                                    <tr>
                                        <td>${escapeHTML(item.farmer)} ${item.verified ? "✓" : ""}<small>${fbT("rating")}</small></td>
                                        <td>₹${item.price}/${item.unit}</td>
                                        <td>${item.quantity} ${item.unit}</td>
                                        <td>${formatDistance(distanceKm(item))}</td>
                                        <td>${item.freshness}%</td>
                                        <td><button class="compare-buy" type="button" onclick="show('product',${item.id})">${fbT("view")}</button></td>
                                    </tr>`).join("")}
                            </tbody>
                        </table>
                    </div>
                </article>` : ""}
        </section>

        ${peers.length ? `
            <section class="section">
                <h2>More ${escapeHTML(product.name)} options</h2>
                <div class="product-grid">${peers.map(fbListing).join("")}</div>
            </section>` : ""}`;
}

function toggleSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const wasClosed = el.hidden;
    el.hidden = !wasClosed;
    const marker = el.previousElementSibling?.querySelector("span");
    if (marker) marker.textContent = wasClosed ? "−" : "+";
    if (wasClosed && id === "detailMap")
        setTimeout(() => fbInitMap([getProduct(currentProductId)], currentProductId), 0);
}

function changeDetailQuantity(amount) {
    const product = getProduct(currentProductId);
    if (!product) return;
    fbDetailQuantity = Math.max(1, Math.min(product.quantity, fbDetailQuantity + amount));
    const el = document.getElementById("detailQuantity");
    if (el) el.textContent = fbDetailQuantity;
}

function addDetailToCart() {
    addToCart(currentProductId, fbDetailQuantity);
}


/* =====================================================
   CART
   ===================================================== */

function addToCart(productId, quantity = 1) {
    const product = getProduct(productId);
    if (!product || product.quantity < 1) return showToast("This listing is out of stock.");
    let item = cart.find(l => Number(l.productId) === Number(productId));
    if (!item) { item = { productId: Number(productId), qty: 0 }; cart.push(item); }
    item.qty = Math.min(product.quantity, item.qty + quantity);
    saveData();
    updateCartCount();
    showToast("Added to cart.");
}

function fbCartLines() {
    return cart.map(item => ({ ...item, product: getProduct(item.productId) })).filter(i => i.product);
}

function fbCartTotal() {
    return fbCartLines().reduce((sum, i) => sum + i.product.price * i.qty, 0);
}

function updateCartQuantity(productId, change) {
    const item = cart.find(l => Number(l.productId) === Number(productId));
    const product = getProduct(productId);
    if (!item || !product) return;
    item.qty = Math.min(product.quantity, item.qty + change);
    if (item.qty <= 0) cart = cart.filter(l => Number(l.productId) !== Number(productId));
    saveData(); updateCartCount(); renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(l => Number(l.productId) !== Number(productId));
    saveData(); updateCartCount(); renderCart();
    showToast("Item removed.");
}

function renderCart() {
    const lines = fbCartLines();
    if (!lines.length) {
        document.getElementById("main").innerHTML = `
            <div class="empty-state">
                <h2>Your cart is empty</h2>
                <p>Add produce from a farmer listing to start a demo order.</p>
                <button class="green-button" type="button" onclick="show('home')">Browse produce</button>
            </div>`;
        return;
    }
    const total = fbCartTotal();
    document.getElementById("main").innerHTML = `
        <h1 class="page-title">${fbT("cart")}</h1>
        <div class="cart-layout">
            <section class="cart-list">
                ${lines.map(item => `
                    <article class="cart-item">
                        <img src="${item.product.image}" alt="${escapeHTML(item.product.name)}">
                        <div class="cart-item-info">
                            <h3>${escapeHTML(item.product.name)}</h3>
                            <p>${escapeHTML(item.product.farmer)} · ${escapeHTML(item.product.location)}</p>
                            <strong class="cart-price">₹${item.product.price}/${item.product.unit}</strong>
                            <div class="cart-controls">
                                <div class="small-qty">
                                    <button type="button" onclick="updateCartQuantity(${item.product.id},-1)">−</button>
                                    <span>${item.qty}</span>
                                    <button type="button" onclick="updateCartQuantity(${item.product.id},1)">+</button>
                                </div>
                                <button class="remove-button" type="button" onclick="removeFromCart(${item.product.id})">${fbT("remove")}</button>
                            </div>
                        </div>
                        <strong>₹${item.product.price * item.qty}</strong>
                    </article>`).join("")}
            </section>
            <aside class="summary-box">
                <h3>Order summary</h3>
                <div class="summary-line"><span>${fbT("subtotal")}</span><span>₹${total}</span></div>
                <div class="summary-line"><span>${fbT("delivery")}</span><span>FREE</span></div>
                <div class="summary-total"><span>${fbT("total")}</span><span>₹${total}</span></div>
                <button class="checkout-button" type="button" onclick="checkout()">${fbT("checkout")}</button>
            </aside>
        </div>`;
}


/* =====================================================
   CHECKOUT
   ===================================================== */

function checkout() {
    const lines = fbCartLines();
    if (!lines.length) return showToast("Your cart is empty.");
    const order = {
        id: `FB${Date.now().toString().slice(-8)}`,
        date: new Date().toLocaleDateString("en-IN"),
        items: lines.map(i => ({
            productId: i.product.id, name: i.product.name, farmer: i.product.farmer,
            image: i.product.image, qty: i.qty, unit: i.product.unit, price: i.product.price
        })),
        total: fbCartTotal(),
        statusIndex: 1
    };
    orders.unshift(order);
    cart = [];
    saveData(); updateCartCount();
    showToast(fbT("orderPlaced"));
    show("orders");
}


/* =====================================================
   ORDERS & TRACKING
   ===================================================== */

function renderOrders() {
    if (!orders.length) {
        document.getElementById("main").innerHTML = `
            <div class="empty-state">
                <h2>No orders yet</h2>
                <p>Place a demo order and it will appear here.</p>
                <button class="green-button" type="button" onclick="show('home')">Browse produce</button>
            </div>`;
        return;
    }
    document.getElementById("main").innerHTML = `
        <h1 class="page-title">${fbT("orders")}</h1>
        ${orders.map(order => `
            <article class="order-card">
               <div class="order-header">

    <div>

        <strong>${escapeHTML(String(order.id))}</strong>

        ${order.type === "bulk"
            ? `<small style="display:block; margin-top:4px;">
                   Bulk Order · ${order.bulkQuantity} kg
               </small>`
            : ""
        }

    </div>

    <span class="order-status">
        ${fbStages[Math.min(
            order.statusIndex ?? 1,
            fbStages.length - 1
        )]}
    </span>

</div>
                <div class="order-body">
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-product">
                                <img src="${item.image}" alt="${escapeHTML(item.name)}">
                                <p><strong>${escapeHTML(item.name)}</strong><br>
                                   ${item.qty} ${item.unit} · ${escapeHTML(item.farmer)} · ₹${item.price * item.qty}</p>
                            </div>`).join("")}
                    </div>
                    <div class="order-actions">
                        <strong>Total: ₹${order.total}</strong>
                        <button class="green-button" type="button" onclick="show('track','${escapeHTML(String(order.id))}')">
                            ${fbT("tracking")}
                        </button>
                    </div>
                </div>
            </article>`).join("")}`;
}

function renderTracking() {
    const order = orders.find(o => String(o.id) === String(currentOrderId));
    if (!order) return show("orders");
    const stage = Math.max(1, Math.min(Number(order.statusIndex ?? 1), fbStages.length - 1));
    document.getElementById("main").innerHTML = `
        <button class="back-button" type="button" onclick="show('orders')">← ${fbT("orders")}</button>
        <h1 class="page-title">${fbT("tracking")} ${escapeHTML(String(order.id))}</h1>
        <section class="tracking-box">
            <p>Demo tracking reflects the current state; separate from farm journey and identity verification.</p>
            ${fbStages.map((name, i) => `
                <div class="tracking-step ${i <= stage ? "active" : ""}">
                    <div class="tracking-icon">${i < stage ? "✓" : i === stage ? "●" : "○"}</div>
                    <div>
                        <strong>${name}</strong>
                        <span>${i < stage ? "Completed" : i === stage ? "Current stage" : "Upcoming"}</span>
                    </div>
                </div>`).join("")}
            <button class="outline-button" type="button" onclick="advanceOrder('${escapeHTML(String(order.id))}')">
                Advance demo status
            </button>
        </section>`;
}

function advanceOrder(id) {
    const order = orders.find(o => String(o.id) === String(id));
    if (!order) return;
    order.statusIndex = Math.min(Number(order.statusIndex ?? 1) + 1, fbStages.length - 1);
    saveData(); renderTracking();
}


/* =====================================================
   CATEGORIES
   ===================================================== */

function renderCategories() {
    const cats = [["Vegetables","images/tomato.jpg"],["Fruits","images/mango.jpg"],["Crops","images/rice.jpg"]];
    document.getElementById("main").innerHTML = `
        <h1 class="page-title">${fbT("category")}</h1>
        <div class="category-page-grid">
            ${cats.map(([name, image]) => `
                <button type="button" class="large-category" onclick="searchCategory('${name}')">
                    <img src="${image}" alt="${name}">
                    <span>${fbT(name.toLowerCase())}</span>
                </button>`).join("")}
        </div>`;
}


/* =====================================================
   PROFILE & LANGUAGE
   ===================================================== */

function changeLanguage(value) {
    language = value;
    saveData();
    updateNavLabels();
    showToast("Language updated.");
    show(currentPage);
}

function renderProfile() {
    document.getElementById("main").innerHTML = `
        <h1 class="page-title">${fbT("profile")}</h1>
        <div class="profile-grid">
            <section class="profile-card">
                <div class="profile-avatar">C</div>
                <h2>Consumer</h2>
                <p>FasalBridge consumer account</p>
            </section>
            <section class="settings-card">
                <div class="setting-row">
                    <div>
                        <strong>${fbT("language")}</strong>
                        <p>Choose your interface language. Search works in every language.</p>
                    </div>
                    <select onchange="changeLanguage(this.value)">
                        ${fbLanguages.map(lang => `
                            <option value="${lang.code}" ${language === lang.code ? "selected" : ""}>
                                ${lang.native}
                            </option>`).join("")}
                    </select>
                </div>
                <div class="setting-row">
                    <div>
                        <strong>${fbT("settings")}</strong>
                        <p>${escapeHTML(locationLabel())}</p>
                    </div>
                    <button class="outline-button" type="button" onclick="useMyLocation()">${fbT("enable")}</button>
                </div>
                <div class="setting-row">
                    <div>
                        <strong>Farmer verification</strong>
                        <p>A Verified Farmer badge means identity verified through a proposed Farmer ID process. Not a quality certification.</p>
                    </div>
                </div>
            </section>
        </div>`;
}


/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateNavLabels();
    updateHeaderLocation();
    show("home");
});

/* =====================================================
   BULK ORDERS & FARMER AGGREGATION
   ===================================================== */

let bulkOrderData = null;


/* -----------------------------------------------------
   BULK ORDER PAGE
   ----------------------------------------------------- */

function renderBulkOrder() {

    const produceNames = [...new Set(products.map(product => product.name))];

    document.getElementById("main").innerHTML = `

        <section class="bulk-page">

            <button
                class="back-button"
                type="button"
                onclick="show('home')"
            >
                ← Back
            </button>

            <div class="bulk-intro">

                <h1>Create a Bulk Order</h1>

                <p>
                    Need a large quantity? FasalBridge can combine
                    produce from multiple nearby farmers to fulfill
                    one large order.
                </p>

            </div>


            <section class="bulk-form-card">

                <div class="bulk-form-grid">

                    <div class="bulk-field">

                        <label for="bulkProduce">
                            What do you need?
                        </label>

                        <select id="bulkProduce">

                            ${produceNames.map(name => `
                                <option value="${escapeHTML(name)}">
                                    ${escapeHTML(name)}
                                </option>
                            `).join("")}

                        </select>

                    </div>


                    <div class="bulk-field">

                        <label for="bulkQuantity">
                            Required quantity
                        </label>

                        <input
                            id="bulkQuantity"
                            type="number"
                            min="1"
                            step="1"
                            value="350"
                            placeholder="Example: 350"
                        >

                    </div>

                </div>


                <button
                    class="bulk-submit"
                    type="button"
                    onclick="findBulkSupply()"
                >
                    Find Supply
                </button>

            </section>


            <div id="bulkResult" class="bulk-result"></div>

        </section>
    `;
}


/* -----------------------------------------------------
   FIND FARMERS
   ----------------------------------------------------- */

function findBulkSupply() {

    const produce = document.getElementById("bulkProduce")?.value;

    const quantityInput = document.getElementById("bulkQuantity");

    const requiredQuantity = Number(quantityInput?.value);


    if (!produce) {
        showToast("Please select a produce.");
        return;
    }

    if (!requiredQuantity || requiredQuantity <= 0) {
        showToast("Please enter a valid quantity.");
        return;
    }


    const listings = products
        .filter(product => product.name === produce && product.quantity > 0)
        .sort((a, b) => distanceKm(a) - distanceKm(b));


    if (!listings.length) {

        document.getElementById("bulkResult").innerHTML = `

            <div class="bulk-no-result">

                <strong>No supply found.</strong>

                <p>
                    There are currently no available listings
                    for this produce.
                </p>

            </div>
        `;

        return;
    }


    let remaining = requiredQuantity;

    const selectedFarmers = [];


    /*
       Take produce from nearby farmers until
       the required quantity is fulfilled.
    */

    for (const farmer of listings) {

        if (remaining <= 0) break;


        const amount = Math.min(
            farmer.quantity,
            remaining
        );


        selectedFarmers.push({
            ...farmer,
            selectedQuantity: amount
        });


        remaining -= amount;
    }


    const totalSupply = selectedFarmers.reduce(
        (sum, farmer) => sum + farmer.selectedQuantity,
        0
    );


    const fulfilled = totalSupply >= requiredQuantity;


    bulkOrderData = {

        produce,
        requiredQuantity,
        selectedFarmers,
        totalSupply,
        fulfilled

    };


    renderBulkResult();
}


/* -----------------------------------------------------
   SHOW AGGREGATION RESULT
   ----------------------------------------------------- */

function renderBulkResult() {

    const result = document.getElementById("bulkResult");

    if (!result || !bulkOrderData) return;


    const {
        produce,
        requiredQuantity,
        selectedFarmers,
        totalSupply,
        fulfilled
    } = bulkOrderData;


    if (!fulfilled) {

        result.innerHTML = `

            <div class="bulk-no-result">

                <strong>
                    We could not fully fulfill this order yet.
                </strong>

                <p>
                    You requested
                    <strong>${requiredQuantity} kg</strong>
                    of ${escapeHTML(produce)},
                    but nearby farmers currently have only
                    <strong>${totalSupply} kg</strong>
                    available.
                </p>

                <p>
                    Try reducing the quantity or checking again later.
                </p>

            </div>
        `;

        return;
    }


    const totalValue = selectedFarmers.reduce(
        (sum, farmer) =>
            sum + farmer.price * farmer.selectedQuantity,
        0
    );


    result.innerHTML = `

        <section class="bulk-result-card">

            <div class="bulk-result-header">

                <div>

                    <h2>
                        ${requiredQuantity} kg ${escapeHTML(produce)}
                    </h2>

                    <p>
                        FasalBridge can fulfill this order
                        using multiple nearby farmers.
                    </p>

                </div>

                <span class="bulk-success-badge">
                    ✓ Order can be fulfilled
                </span>

            </div>


            <div class="bulk-summary">

                <div class="bulk-summary-box">

                    <small>Required</small>

                    <strong>
                        ${requiredQuantity} kg
                    </strong>

                </div>


                <div class="bulk-summary-box">

                    <small>Combined supply</small>

                    <strong>
                        ${totalSupply} kg
                    </strong>

                </div>


                <div class="bulk-summary-box">

                    <small>Farmers involved</small>

                    <strong>
                        ${selectedFarmers.length}
                    </strong>

                </div>

            </div>


            <h3>Contributing farmers</h3>


            <table class="bulk-farmer-table">

                <thead>

                    <tr>
                        <th>Farmer</th>
                        <th>Location</th>
                        <th>Supply</th>
                        <th>Price</th>
                        <th>Distance</th>
                    </tr>

                </thead>


                <tbody>

                    ${selectedFarmers.map(farmer => `

                        <tr>

                            <td class="bulk-farmer-name">

                                ${escapeHTML(farmer.farmer)}

                                ${farmer.verified
                                    ? `<span class="bulk-verified">✓ Verified</span>`
                                    : ""
                                }

                            </td>

                            <td>
                                ${escapeHTML(farmer.location)}
                            </td>

                            <td>
                                ${farmer.selectedQuantity} ${farmer.unit}
                            </td>

                            <td>
                                ₹${farmer.price}/${farmer.unit}
                            </td>

                            <td>
                                ${formatDistance(distanceKm(farmer))}
                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>


            <div class="bulk-route">

                <h3>Collection route</h3>

                <p>
                    FasalBridge can collect the produce from
                    the contributing farmers and bring it to
                    a collection hub before delivery.
                </p>


                <div class="bulk-route-path">

                    ${selectedFarmers.map((farmer, index) => `

                        <span class="bulk-route-stop">
                            ${escapeHTML(farmer.location)}
                        </span>

                        <span class="bulk-route-arrow">
                            →
                        </span>

                    `).join("")}

                    <span class="bulk-route-stop">
                        Collection Hub
                    </span>

                    <span class="bulk-route-arrow">
                        →
                    </span>

                    <span class="bulk-route-stop">
                        Buyer
                    </span>

                </div>


                <p class="bulk-route-note">
                    The demo route currently orders collection
                    points by approximate distance from the buyer
                    location. A production version can use vehicle
                    capacity, road distance, traffic, delivery time
                    and transport cost for route optimization.
                </p>

            </div>


            <div class="summary-line" style="margin-top: 20px;">

                <span>Estimated produce value</span>

                <strong>
                    ₹${totalValue}
                </strong>

            </div>


            <button
                class="bulk-confirm-button"
                type="button"
                onclick="confirmBulkOrder()"
            >
                Confirm Bulk Order
            </button>

        </section>
    `;
}


/* -----------------------------------------------------
   CONFIRM BULK ORDER
   ----------------------------------------------------- */

function confirmBulkOrder() {

    if (!bulkOrderData || !bulkOrderData.fulfilled) {
        showToast("No valid bulk order found.");
        return;
    }


    const {
        produce,
        requiredQuantity,
        selectedFarmers
    } = bulkOrderData;


    const order = {

        id: `FB${Date.now().toString().slice(-8)}`,

        date: new Date().toLocaleDateString("en-IN"),

        type: "bulk",

        bulkQuantity: requiredQuantity,

        items: selectedFarmers.map(farmer => ({

            productId: farmer.id,

            name: farmer.name,

            farmer: farmer.farmer,

            image: farmer.image,

            qty: farmer.selectedQuantity,

            unit: farmer.unit,

            price: farmer.price

        })),

        total: selectedFarmers.reduce(
            (sum, farmer) =>
                sum + farmer.price * farmer.selectedQuantity,
            0
        ),

        statusIndex: 1

    };


    orders.unshift(order);

    saveData();

    bulkOrderData = null;


    showToast(
        `${requiredQuantity} kg ${produce} bulk order placed.`
    );


    show("orders");
}