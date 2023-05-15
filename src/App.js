import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {



  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log(window.location.search)


  const getPageData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const productId = urlParams.get('id');
    console.log(productId)
    return products.find(product => product.id === parseInt(productId));
  };
  const pageData = getPageData();

  console.log(pageData)


  return (
    <div>
      {pageData ? (
        <div className='Idcontainer'>
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
            <img key={index} src={image} alt={`Product ${index + 1}`} />
          ))}
        </div>
      ) : (
        products && products.map((pro, index) => {

          return (

            <div className='container0fPage' key={index}>
              <div className='conatiner'>
                <h2>{pro.title}</h2>
                <img src={pro.thumbnail} alt={pro.title} />
                <p>product Number:{pro.id}</p>
                <p>{pro.description}</p>
                <p>Price: ${pro.price}</p>
                <p>Discount: {pro.discountPercentage}%</p>
                <p>Rating: {pro.rating}</p>
                <p>Stock: {pro.stock}</p>
                <p>Brand: {pro.brand}</p>
                <p>Category: {pro.category}</p>
              </div>

            </div>
          )

        })
      )}
    </div>
  );
};

export default App;
