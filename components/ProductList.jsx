import React from 'react';

function ProductList({ products, onEditProduct, onDeleteProduct }) {
  return (
    <div className="mt-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Price</th>
            <th className="text-left">Description</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 text-red-600 hover:text-red-800"
                  onClick={() => onDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
