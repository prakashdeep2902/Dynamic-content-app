import React, { useState, useEffect } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const getPageData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    return products.find(product => product.id === parseInt(productId));
  };

  const pageData = getPageData();
//  console.log(products)


  return (
    <div>
      {pageData ? (
        <div>
          <h2>{pageData.title}</h2>
          <p>{pageData.description}</p>
          <p>Price: ${pageData.price}</p>
          <p>Discount: {pageData.discountPercentage}%</p>
          <p>Rating: {pageData.rating}</p>
          <p>Stock: {pageData.stock}</p>
          <p>Brand: {pageData.brand}</p>
          <p>Category: {pageData.category}</p>
          <img src={pageData.thumbnail} alt={pageData.title} />
          {pageData.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>
      ) : (
        <p>Page not found.</p>
      )}
    </div>
  );
};

export default App;
