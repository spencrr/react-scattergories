import React from "react";

import Category from "./Category";

export default function CategoryList({ categories }) {
  return (
    <ol>
      {categories?.map((category, index) => {
        return <Category key={index} category={category} />;
      })}
    </ol>
  );
}
