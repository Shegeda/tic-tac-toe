import React from "react";

function Square({ chooseSquare, value }) {
  // Логіка зміни кольору Х та О
  const style = value === "X" ? 'square x' : 'square o';
  return (
    <button className={style} onClick={chooseSquare}>
      {/* value - буде передаватись Х або О  */}
      {value}
      
    </button>
  );
}

export default Square;
