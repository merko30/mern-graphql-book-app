import React from "react";

const BookTable = ({ books }) => {
  return (
    <table className="w-full container border border-primary mb-10 text-secondary">
      <thead>
        <tr className="border-b border-primary text-left">
          <th className="px-4 text-center">Cover</th>
          <th className="px-4">Name</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => {
          return (
            <tr key={book._id} className="border-b border-primary">
              <td className="w-18 h-24 py-2">
                <img
                  className="w-full h-full object-contain"
                  alt={book.title}
                  src={book.cover}
                />
              </td>
              <td className="px-4">{book.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookTable;
