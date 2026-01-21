"use client";

interface AudioNoteCardProps {
  audioUrl: string;
}

export default function AudioNoteCard({ audioUrl }: AudioNoteCardProps) {
  return (
    <section className="property-audio">
      <div className="property-audio-card">
        <h3 className="property-audio-title">Áudio do corretor</h3>
        <audio controls className="property-audio-player">
          <source src={audioUrl} type="audio/mpeg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
        <p className="property-audio-note">
          Ouça uma análise rápida deste imóvel (30-45s)
        </p>
      </div>
    </section>
  );
}

