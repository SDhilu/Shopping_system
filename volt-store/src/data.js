
export const products = [
  {
    id: 1,
    name: "Oversized Studio Tee",
    category: "Clothing",
    price: 4200,
    oldPrice: 5200,
    tag: "BESTSELLER",
    color: "Washed black",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    name: "Everyday Runner",
    category: "Footwear",
    price: 12800,
    oldPrice: null,
    tag: "NEW DROP",
    color: "Cloud white",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "Urban Carry Tote",
    category: "Accessories",
    price: 3600,
    oldPrice: null,
    tag: null,
    color: "Natural canvas",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 4,
    name: "Essential Street Hoodie",
    category: "Clothing",
    price: 8500,
    oldPrice: 9900,
    tag: "SALE",
    color: "Stone grey",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 5,
    name: "Retro Court Sneakers",
    category: "Footwear",
    price: 11400,
    oldPrice: null,
    tag: "TRENDING",
    color: "Vintage cream",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 6,
    name: "Minimal Crossbody",
    category: "Accessories",
    price: 5400,
    oldPrice: null,
    tag: null,
    color: "Midnight black",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 7,
    name: "Daily Classic Tee",
    category: "Clothing",
    price: 3200,
    oldPrice: null,
    tag: null,
    color: "Off white",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 8,
    name: "Streetwear High Tops",
    category: "Footwear",
    price: 13900,
    oldPrice: 15900,
    tag: "LIMITED",
    color: "Black / white",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=85",
  },
];

export const formatPrice = (price) =>
  `LKR ${price.toLocaleString("en-LK")}`;
