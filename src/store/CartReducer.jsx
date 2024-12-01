import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

// --------action-types-------
const CART_ADD_ITEM = 'cart/addItem';
const CART_INCERESE_QTY = 'cart/incereseItem'
const CART_DECREASE_QTY = 'cart/decreaseItem'
const CART_REMOVE_ITEM = 'cart/removeItem'

// -----action-Creaters-------------
export function addItemActionCreater(productData) {
  return {
    type: CART_ADD_ITEM, payload: productData
  }
}
export function increaseActionCreator(productId) {
  return {
    type: CART_INCERESE_QTY,
    payload: { productId: productId }
  }
}

export function decreaseActionCreator(productId) {
  return {
    type: CART_DECREASE_QTY,
    payload: { productId: productId }
  }
}
export function removeActionCreator(productId) {
  return {
    type: CART_REMOVE_ITEM,
    payload: {
      productId: productId,
    }
  }
}

// ----------Cart-Reducer-function------
export default function cartReducer(OrgState = [], action) {
  return produce(OrgState, (state) => {
    let existingItemIndex = state.findIndex((item) =>
      item.productId === action.payload.productId
    );
    switch (action.type) {
      case CART_ADD_ITEM:
        if (existingItemIndex !== -1) {
          state[existingItemIndex].quantity += 1;
          return state
        }
        state.push({ ...action.payload, quantity: 1 });
        break;

      case CART_REMOVE_ITEM:
        state.splice(existingItemIndex, 1);
        break

      case CART_INCERESE_QTY:
        state[existingItemIndex].quantity += 1;
        break

      case CART_DECREASE_QTY:
        state[existingItemIndex].quantity -= 1;
        if (state[existingItemIndex].quantity < 1) {
          state.splice(existingItemIndex, 1);
        }
    }
    return state;
  })
}