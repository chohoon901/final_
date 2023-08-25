import React, { useState, handleDelete } from 'react';
import './style/ProductList.scss';

const ProductList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
    ]);
    const [newProductName, setNewProductName] = useState('');
  
    const handleDelete = (productId) => {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    };
  
    const handleAdd = () => {
      if (newProductName.trim() !== '') {
        const newProduct = { id: Date.now(), name: newProductName };
        setProducts(prevProducts => [...prevProducts, newProduct]);
        setNewProductName('');
      }
    };
    
  
    return (
      <div>
        <h2>상품 조회</h2>
        <input
          type="text"
          placeholder="Enter product name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <button onClick={handleAdd}>Add Product</button>
        <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
        </ul>
      </div>
    );
  };

export default ProductList;