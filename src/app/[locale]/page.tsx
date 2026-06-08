import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SafetyIndex from "@/components/SafetyIndex";
import QuickStart from "@/components/QuickStart";
import Routes from "@/components/Routes";
import InteractiveMap from "@/components/Map/InteractiveMap";
import FoodCulture from "@/components/FoodCulture";
import YouthGuides from "@/components/YouthGuides";
import BecomeGuideForm from "@/components/BecomeGuideForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SafetyIndex />
      <QuickStart />
      <Routes />
      <InteractiveMap />
      <FoodCulture />
      <YouthGuides />
      <BecomeGuideForm />
      <Footer />
    </main>
  );
}
