import React, { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  //console.log('HeaderCartButton props', props);
  const context = useContext(CartContext);
  //console.log('context', context)

  // context.items.length could b used depending on how the cart content
  // is populated. In this case, if we have 4 Sushi's we want the cart to
  // show 1 Object (sushi) of which we have 4 items within the Obj as in {item.amount}.
  // In this case, it would still show as 1 item hence length() would be incorrect.
  // Because of that, using a reducer will be more appropriate.
  let numberOfItems = context.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;