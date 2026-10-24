import Seo from '../components/Seo.jsx';
import { site } from '../data/site.js';

// BORRADOR. Este texto NO fue revisado por un abogado y no debe publicarse tal
// cual: es el minimo para que el formulario tenga un aviso y un consentimiento
// (Ley 25.326 de Proteccion de Datos Personales). Que lo revise Santiago.
export default function Privacidad() {
  return (
    <div className="bg-background min-h-screen">
      <Seo
        title="Politica de privacidad"
        description="Como se tratan los datos personales que se envian a traves del formulario de contacto del estudio."
        path="/privacidad"
      />
      <section className="w-full py-space-2xl bg-surface-container-lowest border-b border-surface-container-high/30">
        <div className="w-full max-w-[820px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
            Informacion legal
          </span>
          <h1 className="font-display-hero text-display-hero-mobile md:text-headline-lg text-on-surface mt-2">
            Politica de privacidad
          </h1>
        </div>
      </section>

      <section className="w-full py-space-2xl bg-surface">
        <div className="w-full max-w-[820px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin space-y-space-lg font-body-md text-on-surface-variant leading-relaxed">
          <div className="p-space-md rounded-xl border border-primary/40 bg-surface-container text-on-surface font-body-sm">
            <strong className="text-primary">Borrador.</strong> Este texto es una base para cumplir
            con la Ley 25.326 y debe ser revisado y aprobado por el estudio antes de publicarse.
          </div>

          <p>
            Los datos que se ingresan en el formulario de contacto de {site.name} (nombre,
            telefono, correo electronico y el detalle de la consulta) se usan unicamente para
            responder esa consulta.
          </p>

          <h2 className="font-headline-sm text-headline-md text-on-surface pt-space-sm">
            Quien los trata
          </h2>
          <p>
            {site.fullName}, con domicilio en {site.address}. Contacto: {site.email}.
          </p>

          <h2 className="font-headline-sm text-headline-md text-on-surface pt-space-sm">
            Para que se usan
          </h2>
          <p>
            Solo para evaluar la consulta y comunicarse con la persona que la envio. No se usan
            para envio de publicidad ni se ceden a terceros.
          </p>

          <h2 className="font-headline-sm text-headline-md text-on-surface pt-space-sm">
            Por cuanto tiempo
          </h2>
          <p>
            Hasta que la consulta quede resuelta o la persona pida su eliminacion.
          </p>

          <h2 className="font-headline-sm text-headline-md text-on-surface pt-space-sm">
            Derechos
          </h2>
          <p>
            Cualquier persona puede pedir el acceso, la rectificacion o la supresion de sus datos
            escribiendo a {site.email}. La autoridad de aplicacion es la Agencia de Acceso a la
            Informacion Publica.
          </p>

          <h2 className="font-headline-sm text-headline-md text-on-surface pt-space-sm">
            Confidencialidad profesional
          </h2>
          <p>
            Mas alla de esta politica, toda la informacion que se comparte con el estudio esta
            alcanzada por el secreto profesional del abogado.
          </p>
        </div>
      </section>
    </div>
  );
}
