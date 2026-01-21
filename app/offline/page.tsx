"use client";

import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="offline-page">
      <div className="offline-container">
        <div className="offline-icon">📡</div>
        <h1>Você está offline</h1>
        <p>
          A interface do app continua funcionando. Assim que a conexão voltar, os
          imóveis serão atualizados.
        </p>
        <p className="offline-tip">
          Dica: seus últimos imóveis abertos e seus "Salvos" permanecem disponíveis.
        </p>
        <div className="offline-actions">
          <Link href="/salvos" className="offline-button">
            Ver Salvos
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="offline-button secondary"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </main>
  );
}

