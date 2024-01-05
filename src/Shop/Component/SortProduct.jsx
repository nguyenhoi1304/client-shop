import React from "react";
import PropTypes from "prop-types";

SortProduct.propTypes = {
  handlerChangeSort: PropTypes.func,
};

SortProduct.defaultProps = {
  handlerChangeSort: null,
};

function SortProduct(props) {
  const { handlerChangeSort } = props;

  const onChangeValue = (e) => {
    const keyword = e.target.value;

    if (!handlerChangeSort) {
      return;
    }

    handlerChangeSort(keyword);
  };

  return (
    <select
      className="selectpicker ml-auto p-2 rounded"
      onChange={onChangeValue}
    >
      <option value="default">Giá cả ngẫu nhiên </option>
      <option value="DownToUp">Giá: thấp đến cao</option>
      <option value="UpToDown">Giá: cao xuống thấp</option>
    </select>
  );
}

export default SortProduct;
