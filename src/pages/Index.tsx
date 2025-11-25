import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TechBackground from "@/components/TechBackground";
import { VisitorCounter } from "@/components/VisitorCounter";
import { Announcements } from "@/components/Announcements";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <TechBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Announcements />
        <div className="fixed bottom-4 right-4 z-50">
          <VisitorCounter />
        </div>
        <About />
        <Projects />
        <Skills />
        <Services />
        <Certifications />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
