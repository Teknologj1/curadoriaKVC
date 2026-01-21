"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Como funciona a busca por perfil?",
    answer:
      "Você responde 3 perguntas simples sobre seu perfil, faixa de investimento e tipo de imóvel. Nossos algoritmos filtram as melhores opções para você.",
  },
  {
    question: "Os imóveis estão atualizados?",
    answer:
      "Sim, nossa base é atualizada diariamente. Todos os imóveis exibidos estão disponíveis.",
  },
  {
    question: "Posso agendar uma visita?",
    answer:
      "Sim! Clique em qualquer imóvel e use o botão WhatsApp para agendar uma visita.",
  },
  {
    question: "Há custo para usar a plataforma?",
    answer:
      "Não. O uso da plataforma é gratuito. Você paga apenas quando fecha negócio com o corretor.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Perguntas Frequentes</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

