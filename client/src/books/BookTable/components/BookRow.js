import React from "react";

export default function BookRow({ book: { cover, title, status, authors } }) {
  return (
    <tr>
      <td className="px-2 py-2 w-16 hidden sm:block h-24">
        <img src={cover} alt={title} className="w-full h-full object-contain" />
      </td>
      <td className="px-2 py-2">{title}</td>
      <td className="px-2 py-2">
        {authors.map(a => (
          <p className="block">{a}</p>
        ))}
      </td>
      <td className="px-2 py-2">{status}</td>
    </tr>
  );
}
