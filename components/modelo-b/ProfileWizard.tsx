"use client";

import { useState } from "react";
import RangeChips from "./RangeChips";

type Step = 1 | 2 | 3;

interface WizardState {
  step: Step;
  profile?: "family" | "investor" | "first_buy" | "luxury";
  faixa?: { min?: number; max?: number };
  tipo?: "apartment" | "house" | "commercial";
}

export default function ProfileWizard() {
  const [wizard, setWizard] = useState<WizardState>({ step: 1 });

  const handleProfileSelect = (profile: WizardState["profile"]) => {
    setWizard({ ...wizard, profile, step: 2 });
    localStorage.setItem("wizard_completed", "true");
  };

  const handleFaixaSelect = (faixa: WizardState["faixa"]) => {
    setWizard({ ...wizard, faixa, step: 3 });
  };

  const handleTipoSelect = (tipo: WizardState["tipo"]) => {
    setWizard({ ...wizard, tipo });
  };

  const handleComplete = () => {
    // Filtrar imóveis com base no wizard
    console.log("Wizard completo:", wizard);
    // Redirecionar para resultados ou atualizar lista
  };

  return (
    <section className="profile-wizard">
      <div className="wizard-container">
        {/* Steps Indicator */}
        <div className="wizard-steps">
          <div className={`wizard-step ${wizard.step >= 1 ? "active" : ""}`}>
            <span className="step-number">1</span>
            <span className="step-label">Perfil</span>
          </div>
          <div className={`wizard-step ${wizard.step >= 2 ? "active" : ""}`}>
            <span className="step-number">2</span>
            <span className="step-label">Investimento</span>
          </div>
          <div className={`wizard-step ${wizard.step >= 3 ? "active" : ""}`}>
            <span className="step-number">3</span>
            <span className="step-label">Tipo</span>
          </div>
        </div>

        {/* Step 1: Perfil */}
        {wizard.step === 1 && (
          <div className="wizard-step-content">
            <h2 className="wizard-question">Qual é o seu momento?</h2>
            <div className="wizard-options">
              {[
                { id: "family", label: "Família" },
                { id: "investor", label: "Investidor" },
                { id: "first_buy", label: "Primeira compra" },
                { id: "luxury", label: "Alto padrão" },
              ].map((option) => (
                <button
                  key={option.id}
                  className="wizard-option-button"
                  onClick={() =>
                    handleProfileSelect(option.id as WizardState["profile"])
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Faixa de Investimento */}
        {wizard.step === 2 && (
          <div className="wizard-step-content">
            <h2 className="wizard-question">Quanto você pretende investir?</h2>
            <RangeChips
              onSelect={(faixa) => handleFaixaSelect(faixa)}
              selected={wizard.faixa}
            />
            <button
              className="wizard-back-button"
              onClick={() => setWizard({ ...wizard, step: 1 })}
            >
              Voltar
            </button>
          </div>
        )}

        {/* Step 3: Tipo de Imóvel */}
        {wizard.step === 3 && (
          <div className="wizard-step-content">
            <h2 className="wizard-question">O que você procura?</h2>
            <div className="wizard-options">
              {[
                { id: "apartment", label: "Apartamento" },
                { id: "house", label: "Casa" },
                { id: "commercial", label: "Comercial" },
              ].map((option) => (
                <button
                  key={option.id}
                  className={`wizard-option-button ${
                    wizard.tipo === option.id ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleTipoSelect(option.id as WizardState["tipo"])
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="wizard-actions">
              <button
                className="wizard-back-button"
                onClick={() => setWizard({ ...wizard, step: 2 })}
              >
                Voltar
              </button>
              <button
                className="wizard-complete-button"
                onClick={handleComplete}
                disabled={!wizard.tipo}
              >
                Ver opções disponíveis
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

