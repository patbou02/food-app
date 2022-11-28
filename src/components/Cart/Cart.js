import { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const context = useContext(CartContext);

  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;

  const cartItemAddHandler = item => context.addItem({...item, amount: 1});
  const cartItemRemoveHandler = id => context.removeItem(id);

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = userData => {
    console.log('inside submit order handler =>', userData);

    fetch('https://react-http-3d132-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: context.items,

      })
    });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {context.items.map((item, index) => <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onAdd={cartItemAddHandler.bind(null, item)}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
      />)}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && (
        <button
          className={classes.button}
          onClick={orderHandler}
        >Order</button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} /> : modalActions}
    </Modal>
  );
};

export default Cart;