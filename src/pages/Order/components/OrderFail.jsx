import { Link } from "react-router-dom"
import { useLanguage } from "../../../i18n";

export const OrderFail = () => {
  const { t } = useLanguage();
  return (
    <section className="text-xl text-center max-w-4xl mx-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700 rounded">
        <div className="my-5">
            <p className="bi bi-exclamation-circle text-red-500 text-7xl mb-5"></p>
            <p>{t("order.failTitle")}</p>     
        </div>
        <div className="my-5">
            <p>{t("order.failNotConfirmed")}</p>
            <p>{t("order.failSupport", { email: "digitalmovies.ph@gmail.com" })}</p>
        </div>
        <Link to="/cart" type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">{t("order.checkCart")}<i className="ml-2 bi bi-cart"></i></Link>
    </section>
  )
}
