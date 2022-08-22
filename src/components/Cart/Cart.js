import { useContext } from 'react';
import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = (props) => {
  const ctx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem({...item, amount: 1});
  };

  const cartItems = ctx.items.map((el) => (
    <CartItem
      key={el.id}
      price={el.price}
      name={el.name}
      amount={el.amount}
      onAdd={cartItemAddHandler.bind(null, el)}
      onRemove={cartItemRemoveHandler.bind(null, el.id)}
    />
  ));
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  return (
    <Modal onClose={props.onCloseCart}>
      <ul className={classes['cart-items']}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
