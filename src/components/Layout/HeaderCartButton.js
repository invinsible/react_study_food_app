import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';

import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnIsAnimate, setIsBtnAnimate] = useState(false);
  const ctx = useContext(CartContext);

  const { items } = ctx;

  const numberOfCart = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsAnimate ? classes.bump : ''}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBtnAnimate(true);
    const timer = setTimeout(() => {
      setIsBtnAnimate(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCart}</span>
    </button>
  );
};

export default HeaderCartButton;
