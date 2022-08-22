import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [isCartShow, setIsCartShow] = useState(false);

  const showCart = () => {
    setIsCartShow(true);
  };

  const closeCart = () => {
    setIsCartShow(false);
  };

  return (
    <CartProvider>
      {isCartShow && <Cart onCloseCart={closeCart} />}
      <Header onShowCart={showCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
