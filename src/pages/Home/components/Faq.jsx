import { Accordion } from "./Accordion";
import { useLanguage, faqs } from "../../../i18n";

export const Faq = () => {
    const { lang, t } = useLanguage();
    const items = faqs[lang] ?? faqs.en;
    
  return (
    <section className="my-10 p-7 border rounded dark:border-slate-700 shadow-sm">        
      <h1 className="text-2xl text-center font-semibold text-orange-600 dark:text-orange-500 mb-3 underline underline-offset-8">{t("home.faq")}</h1>    
            <div className="" id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
              { items.map((faq) => (
                <Accordion key={faq.id} faq={faq} /> 
              )) }
            </div>
      </section>
  )
}
