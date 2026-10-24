import Seo from '../components/Seo.jsx';
import SchemaOrg from '../components/SchemaOrg.jsx';
import Hero from '../sections/Hero.jsx';
import Metrics from '../sections/Metrics.jsx';
import LaborLaw from '../sections/LaborLaw.jsx';
import OtherServices from '../sections/OtherServices.jsx';
import WhyChooseUs from '../sections/WhyChooseUs.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import BlogPreview from '../sections/BlogPreview.jsx';
import Contact from '../sections/Contact.jsx';

export default function Home() {
  return (
    <>
      <Seo
        description="Estudio juridico laboralista en Rosario. Despidos injustificados, accidentes de trabajo (ART), diferencias salariales y otros reclamos. Cobro a resultado."
        path="/"
      />
      <SchemaOrg type="LegalService" />
      <Hero />
      <Metrics />
      <LaborLaw />
      <OtherServices />
      <WhyChooseUs />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </>
  );
}
