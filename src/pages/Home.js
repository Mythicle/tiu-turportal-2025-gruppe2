import Card from "../components/Card";
import ButtonLink from "../components/ButtonLink";

export default function Home() {
  return (
    <div>
      <h1>Velkommen til vår nettside!</h1>
      <p>Utforsk sidene ved å klikke på kortene under eller bruk navbaren.</p>

      <div className="grid">
        <Card title="About" text="Lær mer om oss." link="/about" />
        <Card title="FAQ" text="Vanlige spørsmål og svar." link="/faq" />
        <Card title="Kontakt oss" text="Ta kontakt med oss." link="/kontakt" />
      </div>
      <div>
        <ButtonLink to="/kart">Se vårt kart</ButtonLink>
      </div>
    </div>
  );
}
