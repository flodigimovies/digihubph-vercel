import { useState } from "react"
import { useCart } from "../../../context";
import { useLanguage } from "../../../i18n";
import { CartCard } from "./CartCard"
import { Checkout } from "./Checkout"

export const CartList = () => {
  const [checkout, setCheckout] = useState(false);
  const { cartList, total } = useCart();
  const { t } = useLanguage();

  return (
    <>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          {t("cart.myCart", { count: cartList.length })}
        </p>
      </section>
      
      <section>
       { cartList.map((product) => (
        <CartCard key={product.cartItemId ?? product.id} product={product} />
       )) }
      </section>

      <section className="max-w-4xl m-auto">
        <div className="flex flex-col p-2 border-b dark:border-slate-700 text-lg dark:text-slate-100">
          <p className="flex justify-between my-2">
            <span className="font-semibold">{t("cart.total")}</span>
            <span>₱{total.toLocaleString()}</span>
          </p>
        </div>
        <div className="text-right my-5">
          <button onClick={() => setCheckout(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            {t("cart.checkout", { total: total.toLocaleString() })} <i className="ml-2 bi bi-arrow-right"></i>
          </button>
        </div>
      </section>
      { checkout && <Checkout setCheckout={setCheckout} />}
    </>
  )
}
