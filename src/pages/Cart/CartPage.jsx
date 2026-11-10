import { useTitle } from "../../hooks/useTitle";
import { CartEmpty } from "./components/CartEmpty";
import { CartList } from "./components/CartList";
import { useCart } from "../../context"
import { useLanguage } from "../../i18n";

export const CartPage = () => {
  const { cartList } = useCart();
  const { t } = useLanguage();
  useTitle(t("title.cart", { count: cartList.length }));

  return (
    <main>       
      { cartList.length ? <CartList /> : <CartEmpty /> }   
    </main>
  )
}
