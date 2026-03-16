import { Metadata } from 'next';
import PercentageCalculator from '@/components/tools/PercentageCalculator';
import { getDictionary, Locale } from '@/lib/i18n';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(lang);
  
  return {
    title: dict?.percentage_calculator?.meta_title || "Percentage Calculator - QuickTools",
    description: dict?.percentage_calculator?.meta_description || "Calculate percentages quickly with our free online tool.",
    alternates: {
      languages: {
        'ko': `/ko/percentage-calculator`,
        'en': `/en/percentage-calculator`,
        'es': `/es/percentage-calculator`,
        'pt': `/pt/percentage-calculator`,
        'ja': `/ja/percentage-calculator`,
      }
    }
  };
}

export default async function PercentageCalculatorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  
  const pcDict = dict?.percentage_calculator || {
    title: "Percentage Calculator",
    about_title: "How to use the Percentage Calculator?",
    about_p1: "",
    about_p2: "",
    about_p3: "",
    label_is: "is",
    label_of: "of",
    label_what_is: "What is",
    label_percentage_of: "% of",
    label_what_percentage_is: "is what % of",
    label_percentage_change: "Percentage change from",
    label_to: "to",
    label_result: "Result",
    label_increase: "Increase",
    label_decrease: "Decrease",
    label_increased_by: "Increased by",
    label_decreased_by: "Decreased by",
    label_rate_of_change: "Rate of change",
    label_discount: "Discount"
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-center text-gray-900 dark:text-white mb-8">
          {pcDict.title}
        </h1>
        
        <div className="mb-12">
          <PercentageCalculator dict={pcDict} />
        </div>

        <article className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-[#1a1a1a] p-8 rounded-3xl border dark:border-gray-800 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{pcDict.about_title}</h2>
          <p>{pcDict.about_p1}</p>
          <p>{pcDict.about_p2}</p>
          <p>{pcDict.about_p3}</p>
        </article>
      </div>
    </div>
  );
}
