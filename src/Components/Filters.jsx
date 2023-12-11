import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import common from "../styles/Common/buttons.module.css";
import style from "../styles/Components/filters.module.css";

import {
  handleFetchFilters,
  handleFetchProducts,
  handleFetchProductsGuest,
} from "../utils/productAPI";
import { useAuth } from "../utils/useAuth";

const Filters = ({ callFilters, setProducts }) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();

  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  // below are values for url parameters
  const [itemType, setItemType] = useState([]);
  const [category, setCategory] = useState([]);
  const [gender, setGender] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  const handleSortBy = async (e) => {
    const sortByValue = e.target.id;
    setSortBy(sortByValue);
    setShowSort(false);

    // if the same sorting option is being selected just append and do nothing
    if (sortByValue === sortBy) {
      let params = new URLSearchParams(window.location.search);
      params.set("sortby", sortByValue);
      navigate(`${window.location.pathname}?${params.toString()}`);
    } else {
      // here we add the new sortBy parameter in the url and then send it to the API
      let params = new URLSearchParams(window.location.search);
      params.set("sortby", sortByValue);
      navigate(`${window.location.pathname}?${params.toString()}`);

      const encodedItemType = encodeURIComponent(itemType);
      const encodedCategory = encodeURIComponent(category);
      const encodedGender = encodeURIComponent(gender);
      const encodedSortBy = encodeURIComponent(sortByValue);

      handleFetchFilters(
        encodedItemType,
        encodedCategory,
        encodedGender,
        encodedSortBy
      ).then((response) => {
        setProducts(response);
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.defaultValue?.split("-");
    const filterType = value[0]; // this is filter type i.e. itemType, category, gender.
    const filterName = value[1]; // this is filter value i.e. footwear, t-shirts, men.

    // if something is selected in filters
    if (e.target.checked) {
      if (filterType === "itemType") {
        setItemType((prev) => [...prev, filterName]);
      } else if (filterType === "category") {
        setCategory((prev) => [...prev, filterName]);
      } else if (filterType === "gender") {
        setGender((prev) => [...prev, filterName]);
      }
      // add more filter types here...
    } else {
      // here we check if the unselected item is present in the array or not.
      // If so, we remove it.
      let arr;
      let index;
      if (filterType === "itemType") {
        arr = itemType;
      } else if (filterType === "category") {
        arr = category;
      } else if (filterType === "gender") {
        arr = gender;
      }
      // add more filter types here...
      if (arr) {
        index = arr.indexOf(filterName);
      }
      if (index >= 0) {
        arr.splice(index, 1);
        if (filterType === "itemType") {
          setItemType(arr);
        } else if (filterType === "category") {
          setCategory(arr);
        } else if (filterType === "gender") {
          setGender(arr);
        }
        // add more filter types here...
      }
    }
  };

  const handleResetFilters = () => {
    navigate("/");
    setShowFilters(false);
    setItemType([]);
    setCategory([]);

    if (isLoggedIn) {
      handleFetchProducts().then((response) => {
        setProducts(response);
      });
    } else {
      handleFetchProductsGuest().then((response) => {
        setProducts(response);
      });
    }
  };

  const handleApplyFilters = async () => {
    // Encode the values and construct the URL
    const encodedItemType = encodeURIComponent(itemType);
    const encodedCategory = encodeURIComponent(category);
    const encodedGender = encodeURIComponent(gender);
    const encodedSortBy = encodeURIComponent(sortBy);

    navigate(
      `/?itemType=${encodedItemType}&category=${encodedCategory}&gender=${encodedGender}&sortby=${encodedSortBy}`
    );

    setShowFilters(false);

    handleFetchFilters(
      encodedItemType,
      encodedCategory,
      encodedGender,
      encodedSortBy
    ).then((response) => {
      setProducts(response);
    });
  };

  // This useEffect checks if we need to call filters by default to load products
  // usually occurs when we directly reload the store page with filters applied
  // since we don't want to fetch all products and fetch using filters in that case
  useEffect(() => {
    if (callFilters === true) {
      handleApplyFilters();
    }
  }, [callFilters]);

  useEffect(() => {
    const queryString = decodeURIComponent(window.location.search);
    const filterTypes = queryString.slice(1).split("&");

    // we're getting all the url query parameters and then separated by "&"
    // we get all the filtertypes i.e. itemType=somevalue
    // then we split using "=" & "," to get each filter value
    // and set states of their arrays like itemType, category
    if (queryString !== "" && queryString !== undefined) {
      for (let i = 0; i < filterTypes.length; i++) {
        const filterString = filterTypes[i].split("=");
        if (filterString[1] !== "") {
          let filterArr = filterString[1].split(",");
          if (filterString[0] === "itemType") {
            setItemType(filterArr);
          } else if (filterString[0] === "category") {
            setCategory(filterArr);
          } else if (filterString[0] === "gender") {
            setGender(filterArr);
          } else if (filterString[0] === "sortby") {
            setSortBy(filterArr);
          }
          // add more filter types here...
        }
      }
    }
  }, [window.location.search]);

  return (
    <div className={style.Container}>
      <div className={style.ButtonsSection}>
        <button
          className={common.Primary}
          onClick={() => {
            setShowSort(false);
            setShowFilters(!showFilters);
          }}
        >
          Show Filters
        </button>
        <button
          className={common.Primary}
          onClick={() => {
            setShowFilters(false);
            setShowSort(!showSort);
          }}
        >
          Sort Items
        </button>
      </div>
      {showFilters === true ? (
        <div className={style.Left}>
          <div className={style.FilterOptions}>
            <ul className={style.FilterList}>
              <li>
                <h4>Gender</h4>
                <div>
                  <input
                    type="checkbox"
                    id="men"
                    value="gender-Men"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={gender.includes("Men") ? true : false}
                  />
                  <label htmlFor="men">Men</label>
                  <br></br>
                  <input
                    type="checkbox"
                    id="women"
                    value="gender-Women"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={gender.includes("Women") ? true : false}
                  />
                  <label htmlFor="women">Women</label>
                  <br></br>
                  <input
                    type="checkbox"
                    id="Kids"
                    value="gender-Kids"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={gender.includes("Kids") ? true : false}
                  />
                  <label htmlFor="Kids">Kids</label>
                </div>
              </li>
              <li>
                <h4>Item Type</h4>
                <div>
                  <input
                    type="checkbox"
                    id="footwear"
                    value="itemType-Footwear"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={
                      itemType.includes("Footwear") ? true : false
                    }
                  />
                  <label htmlFor="footwear">Footwear</label>
                  <br></br>
                  <input
                    type="checkbox"
                    id="accessory"
                    value="itemType-Accessory"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={
                      itemType.includes("Accessory") ? true : false
                    }
                  />
                  <label htmlFor="accessory">Accessory</label>
                </div>
              </li>
              <li>
                <h4>Category</h4>
                <div>
                  <input
                    type="checkbox"
                    id="t-shirts"
                    value="category-T_shirts"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={
                      category.includes("T_shirts") ? true : false
                    }
                  />
                  <label htmlFor="t-shirts">T-Shirts</label>
                  <br></br>
                  <input
                    type="checkbox"
                    id="tops"
                    value="category-Tops"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={category.includes("Tops") ? true : false}
                  />
                  <label htmlFor="tops">Tops</label>
                  <br></br>
                  <input
                    type="checkbox"
                    id="jeans"
                    value="category-Jeans"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={category.includes("Jeans") ? true : false}
                  />
                  <label htmlFor="jeans">Jeans</label>
                  <br></br>
                  <input
                    type="checkbox"
                    id="trousers"
                    value="category-Trousers"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={
                      category.includes("Trousers") ? true : false
                    }
                  />
                  <label htmlFor="trousers">Trousers</label>
                  <br></br>
                  <input
                    type="checkbox"
                    id="shoes"
                    value="category-Shoes"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={category.includes("Shoes") ? true : false}
                  />
                  <label htmlFor="shoes">Shoes</label>
                  <br></br>
                  <input
                    type="checkbox"
                    id="bags"
                    value="category-Bag"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={category.includes("Bag") ? true : false}
                  />
                  <label htmlFor="bags">Bags</label>
                </div>
              </li>
            </ul>
          </div>
          <div className={style.ApplyBtn}>
            <button
              className={common.Primary}
              onClick={() => handleApplyFilters()}
            >
              Apply
            </button>
            <button
              className={common.Primary}
              onClick={() => handleResetFilters()}
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : null}
      {showSort === true ? (
        <div className={style.Right}>
          <div className={style.SortOptions}>
            <ul id="sort_items">
              <li id="newest" onClick={(e) => handleSortBy(e)}>
                What's New
              </li>
              <li id="mrp_high_to_low" onClick={(e) => handleSortBy(e)}>
                MRP {"(High to Low)"}
              </li>
              <li id="mrp_low_to_high" onClick={(e) => handleSortBy(e)}>
                MRP {"(Low to High)"}
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Filters;
