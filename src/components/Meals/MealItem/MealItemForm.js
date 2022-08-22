import { useRef, useState } from 'react';
import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amoutInputRef = useRef();
  const [isValid, setIsValid ] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = +amoutInputRef.current.value;

    if (enteredAmount < 1) {
      setIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amoutInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button >+ Add</button>
      {!isValid && <p>Please entered a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
