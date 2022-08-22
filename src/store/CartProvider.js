import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === 'add') {    
    const updTotalAmount = state.totalAmount + action.item.amount * action.item.price;

    const existingItemIndex = state.items.findIndex(el => el.id === action.item.id);
    const existingItem = state.items[existingItemIndex];
    
    let updItems;

    if(existingItem) {
      const updItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      }
      updItems = [...state.items];
      updItems[existingItemIndex] = updItem;
    } else {
      updItems = state.items.concat(action.item);
    }
    
    return {
      items: updItems,
      totalAmount: updTotalAmount,
    };
  }

  if (action.type === 'remove') {
    const existingItemIndex = state.items.findIndex(el => el.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updTotalAmount = state.totalAmount - existingItem.price;

    let updItems;
    if (existingItem.amount === 1) {
      updItems = state.items.filter(el => el.id !== action.id);
    } else {
      const updItem = {...existingItem, amount: existingItem.amount - 1};
      updItems = [...state.items];
      updItems[existingItemIndex] = updItem;
    }

    return {
      items: updItems,
      totalAmount: updTotalAmount
    }
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(CartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatch({ type: 'add', item });
  };
  const removeItemHandler = (id) => {
    dispatch({ type: 'remove', id });
  };

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {' '}
      {props.children}{' '}
    </CartContext.Provider>
  );
};

export default CartProvider;
