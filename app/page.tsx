import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Award,
  ClosingCta,
  Curriculum,
  Hero,
  ImageBand,
  Outcomes,
  WhyNow,
} from '@/components/Sections';

export default function Page() {
  return (
    <>
      <Header />
      <div id="top" />
      <main>
        <Hero />
        <WhyNow />
        <Curriculum />
        <ImageBand />
        <Outcomes />
        <Award />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
