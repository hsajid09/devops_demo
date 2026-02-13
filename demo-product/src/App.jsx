
import { useState, useEffect } from "react";
import "./App.css";
import ProductList from "./ProductList";
import CategoryFilter from "./CategoryFilter";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchProducts = async () => {

      const response = await fetch("http://localhost:8080/api/products");
      const json = await response.json();
      if (response.ok) {
        setProducts(json);
        console.log(json);
      }

      const response1 = await fetch("http://localhost:8080/api/categories");
      const json1 = await response1.json();
      if (response1.ok) {
        setCategories(json1);
        console.log(json1);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    //e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId ? Number(categoryId) : null);
  };

  const filteredProducts = products
                                              .filter(product=> {
    return (
      (selectedCategory ? product.category.id === selectedCategory : true) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }).sort( (a, b) =>{
    if(sortOrder==="asc"){
      return a.price-b.price;
    }else{
      return b.price-a.price;
    }
    
  })

  return (
    <div className="container">
      <h1 className="pcatalog">Product Catalog</h1>
      <div className="row align-items-center mb-4">
        <div className="col-md-3 col-sm-12 mb-2">
          <CategoryFilter
            categories={categories}
            onSelect={handleCategorySelect}
          />
        </div>
        <div className="col-md-5 col-sm-12 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products"
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-4 col-sm-12 mb-2">
          <select className="form-control" onChange={handleSortChange}>
            <option value="asc">Sort by Price : Low to High</option>
            <option value="asc">Sort by Price : High to Low</option>
          </select>
        </div>
      </div>
      <div>
        {filteredProducts.length ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p>No Products Found</p>
        )}
      </div>
    </div>
  );
}

export default App;