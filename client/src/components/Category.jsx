import React from "react";

export default function Category({ category, onClear }) {
  // useEffect(() => {
  //   onClear.add(resetForm);
  // }, []);
  return (
    <li>
      <span>{category}</span>
      <br />
      <input type="text" />
    </li>
  );
}
