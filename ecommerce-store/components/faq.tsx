import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "./ui/separator"

const faqItems = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "Is it styled?",
    answer: "Yes. It comes with default styles that match the other components' aesthetic.",
  },
  {
    question: "Is it animated?",
    answer: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export function FAQSection() {
  return (
    <>
      <div className="mt-8">
        <Separator />
        <p className="text-center mt-8 mb-4 font-extrabold sm:text-4xl text-xl ">
          Frequently asked questions
        </p>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger>
                <p className="text-xl">
                  {item.question}
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-lg">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}
