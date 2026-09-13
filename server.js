import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

const USERS_FILE = path.join(DATA_DIR, "users.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");


/* =====================================================
   BASIC MIDDLEWARE
   ===================================================== */

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(UPLOAD_DIR));


/* =====================================================
   FILE UPLOAD
   ===================================================== */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const filename =
            `${Date.now()}-${crypto.randomUUID()}${ext}`;

        cb(null, filename);
    }
});


const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Only JPG, PNG or WEBP images are allowed"
                )
            );
        }
    }
});


/* =====================================================
   HELPERS
   ===================================================== */

async function ensureFiles() {

    await fs.mkdir(UPLOAD_DIR, {
        recursive: true
    });

    const files = [
        USERS_FILE,
        PRODUCTS_FILE,
        ORDERS_FILE
    ];

    for (const file of files) {

        if (!existsSync(file)) {

            await fs.writeFile(
                file,
                "[]",
                "utf8"
            );
        }
    }
}


async function readArray(file) {

    try {

        const raw = await fs.readFile(
            file,
            "utf8"
        );

        const data = JSON.parse(
            raw || "[]"
        );

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        return [];
    }
}


async function writeArray(file, data) {

    await fs.writeFile(
        file,
        JSON.stringify(data, null, 2),
        "utf8"
    );
}


function now() {

    return new Date().toISOString();
}


function makeId(prefix) {

    return `${prefix}-${crypto
        .randomUUID()
        .slice(0, 8)
        .toUpperCase()}`;
}


/* =====================================================
   HOME / HEALTH CHECK
   ===================================================== */

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "🌾 FasalBridge Backend is running!"
    });

});


/* =====================================================
   LOGIN / REGISTER
   ===================================================== */

app.post("/api/auth/login", async (req, res) => {

    try {

        const {
            name,
            phone,
            email,
            location,
            language,
            role
        } = req.body;

        if (!phone && !email) {

            return res.status(400).json({
                success: false,
                message: "Phone or email is required"
            });

        }

        const users =
            await readArray(USERS_FILE);


        const loginValue =
            phone || email;


        let user =
            users.find(u =>
                phone
                    ? u.phone === phone
                    : u.email === email
            );


        if (!user) {

            user = {

                id: makeId("USR"),

                name:
                    name ||
                    "FasalBridge User",

                phone:
                    phone || "",

                email:
                    email || "",

                location:
                    location || "",

                language:
                    language || "English",

                role:
                    role || "buyer",

                farmerId: "",

                farmSize: "",

                notifications: true,

                orderUpdates: true,

                createdAt: now(),

                updatedAt: now()
            };

            users.push(user);

        } else {

            if (name) {
                user.name = name;
            }

            if (location) {
                user.location = location;
            }

            if (language) {
                user.language = language;
            }

            if (role) {
                user.role = role;
            }

            user.updatedAt = now();
        }


        await writeArray(
            USERS_FILE,
            users
        );


        res.json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }

});


/* =====================================================
   GET USER
   ===================================================== */

app.get("/api/users/:id", async (req, res) => {

    const users =
        await readArray(USERS_FILE);

    const user =
        users.find(
            u => u.id === req.params.id
        );

    if (!user) {

        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.json({
        success: true,
        user
    });

});


/* =====================================================
   UPDATE USER ROLE
   ===================================================== */

app.patch("/api/users/:id/role", async (req, res) => {

    const users =
        await readArray(USERS_FILE);

    const user =
        users.find(
            u => u.id === req.params.id
        );

    if (!user) {

        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    user.role =
        req.body.role || user.role;

    user.updatedAt = now();

    await writeArray(
        USERS_FILE,
        users
    );

    res.json({
        success: true,
        user
    });

});


/* =====================================================
   UPDATE PROFILE
   ===================================================== */

app.patch("/api/users/:id/profile", async (req, res) => {

    const users =
        await readArray(USERS_FILE);

    const user =
        users.find(
            u => u.id === req.params.id
        );

    if (!user) {

        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }


    const allowedFields = [
        "name",
        "phone",
        "email",
        "location",
        "farmerId",
        "farmSize",
        "language"
    ];


    for (const field of allowedFields) {

        if (req.body[field] !== undefined) {

            user[field] =
                req.body[field];
        }
    }


    user.updatedAt = now();


    await writeArray(
        USERS_FILE,
        users
    );


    res.json({
        success: true,
        user
    });

});


/* =====================================================
   UPDATE SETTINGS
   ===================================================== */

app.patch("/api/users/:id/settings", async (req, res) => {

    const users =
        await readArray(USERS_FILE);

    const user =
        users.find(
            u => u.id === req.params.id
        );

    if (!user) {

        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }


    if (req.body.notifications !== undefined) {

        user.notifications =
            Boolean(req.body.notifications);
    }


    if (req.body.orderUpdates !== undefined) {

        user.orderUpdates =
            Boolean(req.body.orderUpdates);
    }


    user.updatedAt = now();


    await writeArray(
        USERS_FILE,
        users
    );


    res.json({
        success: true,
        user
    });

});


/* =====================================================
   GET PRODUCTS
   ===================================================== */

app.get("/api/products", async (req, res) => {

    const {
        search = "",
        category = "",
        location = ""
    } = req.query;


    let products =
        await readArray(PRODUCTS_FILE);


    const searchText =
        String(search).trim().toLowerCase();


    if (searchText) {

        products =
            products.filter(product => {

                const text = [
                    product.name,
                    product.category,
                    product.farmerName,
                    product.location
                ]
                    .join(" ")
                    .toLowerCase();

                return text.includes(searchText);
            });
    }


    if (category && category !== "All") {

        products =
            products.filter(
                product =>
                    product.category === category
            );
    }


    if (location) {

        const locationText =
            String(location).toLowerCase();

        products =
            products.filter(product =>
                String(product.location || "")
                    .toLowerCase()
                    .includes(locationText)
            );
    }


    products =
        products.filter(
            product =>
                product.active !== false
        );


    res.json({
        success: true,
        products
    });

});


/* =====================================================
   GET ONE PRODUCT
   ===================================================== */

app.get("/api/products/:id", async (req, res) => {

    const products =
        await readArray(PRODUCTS_FILE);


    const product =
        products.find(
            p => String(p.id) === String(req.params.id)
        );


    if (!product) {

        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }


    res.json({
        success: true,
        product
    });

});


/* =====================================================
   CREATE PRODUCT
   ===================================================== */

app.post(
    "/api/products",
    upload.single("image"),
    async (req, res) => {

        try {

            const {
                name,
                category,
                price,
                priceUnit,
                quantity,
                quantityUnit,
                description,
                location,
                farmerId,
                farmerName
            } = req.body;


            if (
                !name ||
                !category ||
                !price ||
                !quantity ||
                !farmerId
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Name, category, price, quantity and farmerId are required"
                });
            }


            const products =
                await readArray(PRODUCTS_FILE);


            const product = {

                id: makeId("PRD"),

                name,

                category,

                price: Number(price),

                priceUnit:
                    priceUnit || "kg",

                quantity: Number(quantity),

                quantityUnit:
                    quantityUnit || "kg",

                description:
                    description || "",

                location:
                    location || "",

                farmerId,

                farmerName:
                    farmerName || "Farmer",

                imageUrl:
                    req.file
                        ? `/uploads/${req.file.filename}`
                        : "",

                active: true,

                createdAt: now(),

                updatedAt: now()
            };


            products.push(product);


            await writeArray(
                PRODUCTS_FILE,
                products
            );


            res.status(201).json({

                success: true,

                message:
                    "Product listed successfully",

                product
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Could not create product"
            });
        }
    }
);


/* =====================================================
   GET ORDERS
   ===================================================== */

app.get("/api/orders", async (req, res) => {

    const {
        farmerId,
        buyerId,
        status
    } = req.query;


    let orders =
        await readArray(ORDERS_FILE);


    if (farmerId) {

        orders =
            orders.filter(
                order =>
                    String(order.farmerId) ===
                    String(farmerId)
            );
    }


    if (buyerId) {

        orders =
            orders.filter(
                order =>
                    String(order.buyerId) ===
                    String(buyerId)
            );
    }


    if (status) {

        orders =
            orders.filter(
                order =>
                    order.status === status
            );
    }


    orders.sort(
        (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
    );


    res.json({
        success: true,
        orders
    });

});


/* =====================================================
   CREATE ORDER
   ===================================================== */

app.post("/api/orders", async (req, res) => {

    try {

        const {
            productId,
            buyerId,
            buyerName,
            buyerLocation,
            quantity
        } = req.body;


        if (
            !productId ||
            !buyerId ||
            !quantity
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "productId, buyerId and quantity are required"
            });
        }


        const products =
            await readArray(PRODUCTS_FILE);


        const product =
            products.find(
                p =>
                    String(p.id) ===
                    String(productId)
            );


        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        if (product.active === false) {

            return res.status(400).json({
                success: false,
                message:
                    "This product is no longer available"
            });
        }


        const orderQuantity =
            Number(quantity);


        if (
            !Number.isFinite(orderQuantity) ||
            orderQuantity <= 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Quantity must be greater than zero"
            });
        }


        if (
            orderQuantity >
            Number(product.quantity)
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Not enough stock available"
            });
        }


        const orders =
            await readArray(ORDERS_FILE);


        const total =
            Number(product.price) *
            orderQuantity;


        const order = {

            id: makeId("ORD"),

            productId:
                product.id,

            productName:
                product.name,

            buyerId,

            buyerName:
                buyerName || "Buyer",

            buyerLocation:
                buyerLocation || "",

            farmerId:
                product.farmerId,

            farmerName:
                product.farmerName,

            quantity:
                orderQuantity,

            quantityUnit:
                product.quantityUnit,

            price:
                Number(product.price),

            total,

            status:
                "Pending",

            createdAt:
                now()
        };


        orders.unshift(order);


        product.quantity =
            Number(product.quantity) -
            orderQuantity;


        if (product.quantity <= 0) {

            product.quantity = 0;

            product.active = false;
        }


        product.updatedAt = now();


        await writeArray(
            ORDERS_FILE,
            orders
        );


        await writeArray(
            PRODUCTS_FILE,
            products
        );


        res.status(201).json({

            success: true,

            message:
                "Order placed successfully",

            order
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Could not create order"
        });
    }

});


/* =====================================================
   UPDATE ORDER STATUS
   ===================================================== */

app.patch(
    "/api/orders/:id/status",
    async (req, res) => {

        const {
            status
        } = req.body;


        const allowedStatuses = [
            "Pending",
            "Confirmed",
            "Processing",
            "Completed",
            "Cancelled"
        ];


        if (
            !allowedStatuses.includes(status)
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Invalid order status"
            });
        }


        const orders =
            await readArray(ORDERS_FILE);


        const order =
            orders.find(
                o =>
                    String(o.id) ===
                    String(req.params.id)
            );


        if (!order) {

            return res.status(404).json({
                success: false,
                message:
                    "Order not found"
            });
        }


        order.status = status;


        await writeArray(
            ORDERS_FILE,
            orders
        );


        res.json({
            success: true,
            order
        });

    }
);


/* =====================================================
   ERROR HANDLER
   ===================================================== */

app.use((error, req, res, next) => {

    console.error(error);

    res.status(400).json({

        success: false,

        message:
            error.message ||
            "Something went wrong"
    });

});


/* =====================================================
   START SERVER
   ===================================================== */

ensureFiles()
    .then(() => {

        app.listen(PORT, () => {

            console.log("");
            console.log("====================================");
            console.log("🌾 FasalBridge Backend");
            console.log("====================================");
            console.log(
                `Server running at http://localhost:${PORT}`
            );
            console.log("====================================");
            console.log("");

        });

    })
    .catch(error => {

        console.error(
            "Could not start server:",
            error
        );

    });