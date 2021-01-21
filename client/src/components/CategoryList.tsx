import React from "react";
import { GameState } from "../types";

type Props = Pick<GameState, "categories">;

export default function CategoryList(props: Props): JSX.Element {
  return (
    <ol>
      {props.categories.map((category, index) => (
        <li key={index}>
          <span>{category}</span>
          <br />
          <input type="text" />
        </li>
      ))}
    </ol>
  );
}
