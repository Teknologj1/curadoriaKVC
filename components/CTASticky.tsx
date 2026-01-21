"use client";

export function CTASticky() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 backdrop-blur border-t"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <a
        className="block text-center w-full rounded-full py-3 text-sm font-semibold"
        style={{ background: "var(--accent)", color: "var(--accentText)" }}
        href="https://wa.me/5561999999999?text=Ol%C3%A1!%20Vi%20a%20curadoria%20e%20quero%20conversar%20sobre%20op%C3%A7%C3%B5es%20no%20meu%20perfil."
      >
        Conversar no WhatsApp
      </a>
    </div>
  );
}

