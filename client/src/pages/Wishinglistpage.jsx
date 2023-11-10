import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WishlistPage = ({ items, onRemove }) => {
  return (
    <table className="p-4 mt-4 table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Item Name</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {/* <td className="px-4 py-2">
              <img src={item.image} alt={item.title} width="50" height="50" />
            </td> */}
            <td className="px-4 py-2">{item.product_name}</td>
            <td className="px-4 py-2">${item.price}</td>
            <td className="px-4 py-2">
              <button
                className="px-2 py-1 text-white bg-red-500 rounded"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const WishListPage = () => {
  const [wishListItems, setWishListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function Remove(id) {
    // const apiUrl = `http://localhost:8080/editwishlis/${id}`;
    console.log(id)
    axios.delete(`http://localhost:8080/editwishlist/${id}`)
      .then(function (response) {
        console.log('Data successfully sent:', response.data);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetch('http://localhost:8080/wishlist')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setWishListItems(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center p-4 rounded-lg bg-[#F9EFE6] mx-auto w-full md:w-[calc(100% - 3rem)] max-w-screen-xl md:space-x-4 justify-center">
      <h1 className="text-2xl font-semibold text-left">My Wish List</h1>
      {isLoading ? (
        <p>Loading wish list items...</p>
      ) : (
        <WishlistPage items={wishListItems} onRemove={Remove} />
      )}
    </div>
  );
};

export default WishListPage;