import React, { useState } from 'react';

function ToolSearchBox() {
  const [searchValue, changeSearchValue] = useState('');

  return (
    <div>
      <input
        value={searchValue}
        onChange={event => {
          changeSearchValue(event.taget.value);
        }}
      />
    </div>
  );
}

export default ToolSearchBox;
