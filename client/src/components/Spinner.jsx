import React from "react";
import {Watch} from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="example-container">
      {/* <h2>Loading...</h2> */}
      {/* <Puff
        height="80"
        width="80"
        radius={1}
        color="#86a2f9"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> */}
      <Watch
  height="80"
  width="80"
  radius="48"
  color="#86a2f9"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
    </div>
  );
};

export default Spinner;
