import { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "",
    price: "",
    original_price: "",
    specifications: "",
    description: "",
    brand: "",
    tags: "",
    stock: "",
    warranty: "",
    return_policy: "",
  });
  const [image, setImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3003/products");
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError("Failed to fetch products");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const productData = {
      productName: newProduct.productName,
      category: newProduct.category,
      price: newProduct.price,
      original_price: newProduct.original_price,
      specifications: newProduct.specifications,
      description: newProduct.description,
      brand: newProduct.brand,
      tags: newProduct.tags.split(",").map((tag) => tag.trim()),
      stock: newProduct.stock,
      warranty: newProduct.warranty,
      return_policy: newProduct.return_policy,
    };

    const formData = new FormData();
    formData.append("productData", JSON.stringify(productData));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3003/products",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setProducts([...products, response.data.data]);
        resetForm();
        alert("Product added successfully!");
      } else {
        setError("Failed to add product");
      }
    } catch (err) {
      console.error(err);
      setError("Error adding product");
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const productData = {
      productName: newProduct.productName,
      category: newProduct.category,
      price: newProduct.price,
      original_price: newProduct.original_price,
      specifications: newProduct.specifications,
      description: newProduct.description,
      brand: newProduct.brand,
      tags: newProduct.tags.split(",").map((tag) => tag.trim()),
      stock: newProduct.stock,
      warranty: newProduct.warranty,
      return_policy: newProduct.return_policy,
    };

    try {
      const response = await axios.put(
        `http://localhost:3003/products/${editingProduct._id}`,
        productData
      );

      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProduct._id ? response.data.data : product
          )
        );
        setEditingProduct(null);
        resetForm();
        alert("Product updated successfully!");
      } else {
        setError("Failed to update product.");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3003/products/${id}`);
      if (response.data.success) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        setError("Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product");
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setNewProduct({
      productName: "",
      category: "",
      price: "",
      original_price: "",
      specifications: "",
      description: "",
      brand: "",
      tags: "",
      stock: "",
      warranty: "",
      return_policy: "",
    });
    setImage(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProduct({
      productName: product.productName,
      category: product.category,
      price: product.price,
      original_price: product.original_price,
      specifications: product.specifications,
      description: product.description,
      brand: product.brand,
      tags: product.tags.join(", "),
      stock: product.stock,
      warranty: product.warranty,
      return_policy: product.return_policy,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ maxWidth: 1100, margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30, color: "#2c3e50" }}>
        🛍 Product Management
      </h1>

      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: 40,
        }}
      >
        <h2 style={{ marginBottom: 20 }}>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
          {[
            { name: "productName", label: "Product Name" },
            { name: "category", label: "Category" },
            { name: "price", label: "Price", type: "number" },
            { name: "original_price", label: "Original Price", type: "number" },
            { name: "description", label: "Description", isTextArea: true },
            { name: "brand", label: "Brand" },
            { name: "tags", label: "Tags (comma-separated)" },
            { name: "stock", label: "Stock", type: "number" },
            { name: "warranty", label: "Warranty" },
            { name: "return_policy", label: "Return Policy" },
            { name: "specifications", label: "Specifications (one line)" },
          ].map((field) =>
            field.isTextArea ? (
              <textarea
                key={field.name}
                placeholder={field.label}
                value={newProduct[field.name]}
                onChange={(e) => setNewProduct({ ...newProduct, [field.name]: e.target.value })}
                style={{
                  padding: 10,
                  marginBottom: 12,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  width: "100%",
                  resize: "vertical",
                }}
              />
            ) : (
              <input
                key={field.name}
                type={field.type || "text"}
                placeholder={field.label}
                value={newProduct[field.name]}
                onChange={(e) => setNewProduct({ ...newProduct, [field.name]: e.target.value })}
                style={{
                  padding: 10,
                  marginBottom: 12,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  width: "100%",
                }}
              />
            )
          )}

          <label style={{ marginBottom: 8, display: "block" }}>Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginBottom: 16 }}
          />

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#27ae60",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>

            {editingProduct && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  backgroundColor: "#95a5a6",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 style={{ marginBottom: 20 }}>📦 Product List</h2>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
          }}
        >
          <thead style={{ backgroundColor: "#27ae60", color: "#fff" }}>
            <tr>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>#</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Category</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Brand</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Price</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Stock</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Ratings</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: 12 }}>{index + 1}</td>
                <td style={{ padding: 12 }}>{product.productName}</td>
                <td style={{ padding: 12 }}>{product.category}</td>
                <td style={{ padding: 12 }}>{product.brand}</td>
                <td style={{ padding: 12 }}>${product.price}</td>
                <td style={{ padding: 12 }}>{product.stock}</td>
                <td style={{ padding: 12 }}>{product.averageRatings || "N/A"}</td>
                <td style={{ padding: 12 }}>
                  <button
                    onClick={() => handleEditClick(product)}
                    style={{
                      backgroundColor: "#f39c12",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: 6,
                      marginRight: 8,
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;