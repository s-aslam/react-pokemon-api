import React from "react";

export const TableLoadingText = (props) => {
  const { colSpan, text } = props;
  return (
    <tr>
      <td colSpan={colSpan}>{text}</td>
    </tr>
  );
};
