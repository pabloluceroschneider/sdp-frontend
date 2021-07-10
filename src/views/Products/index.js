import React, { useRef, useCallback, useEffect } from "react";
// redux
import { useSelector, useDispatch } from 'react-redux';
import { storeProducts } from 'redux/actions'

// project components
import Products from "components/Products";
import productService from 'services/productService';

export default function ProductsView() {
  const updateRef = useRef();
  const products = useSelector(state => state.appData.products);
  const dispatch = useDispatch();

  const updateData = useCallback(
    () => {
      productService.allProducts()
      .then( ({response}) => {
        dispatch(storeProducts(response))
      });
  },[dispatch]);

	useEffect(() => {
    if (updateRef.current) return;
		updateData();
    updateRef.current = true;
	},[products, updateData]);

  return (
    <Products 
      products={products}
      updateData={updateData}
      />
  );
}
