import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

Search.propTypes = {
  handlerSearch: PropTypes.func,
};

Search.defaultProps = {
  handlerSearch: null,
};

function Search(props) {
  const { handlerSearch } = props;
  const navigation = useNavigate();

  const [search, setSearch] = useState("");

  const delaySearchTextTimeOut = useRef(null);

  const onChangeText = (e) => {
    const value = e.target.value;

    setSearch(value);

    console.log(search);

    if (handlerSearch) {
      //Nếu người dùng đang nhập thì mình clear cái giây đó
      if (delaySearchTextTimeOut.current) {
        clearTimeout(delaySearchTextTimeOut.current);
      }

      delaySearchTextTimeOut.current = setTimeout(() => {
        handlerSearch(value);
      }, 1000);
    }

    // xóa params tìm kiếm ở phần Header
    navigation("/shop");
  };

  return (
    <div className="col-lg-4 ">
      <input
        className="form-control form-control-lg p-2 rounded"
        type="text"
        placeholder="Nhập để tìm kiếm...!"
        onChange={onChangeText}
        value={search}
      />
    </div>
  );
}

export default Search;
