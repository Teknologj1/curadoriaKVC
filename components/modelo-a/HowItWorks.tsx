"use client";

const steps = [
  {
    number: "01",
    title: "Entendo seu momento",
    description: "Antes de imóvel, entendo contexto, orçamento e expectativa.",
  },
  {
    number: "02",
    title: "Filtro o mercado",
    description: "A maioria das opções fica de fora.",
  },
  {
    number: "03",
    title: "Apresento poucas escolhas",
    description: "Apenas o que realmente faz sentido.",
  },
  {
    number: "04",
    title: "Acompanho até a decisão",
    description: "Do primeiro contato à assinatura.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <h2 className="how-it-works-title">Menos opções. Mais clareza.</h2>
        <div className="how-it-works-steps">
          {steps.map((step) => (
            <div key={step.number} className="how-it-works-step">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

