import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';
import { AEAArchitecture } from '@/components/sections/AEAArchitecture';
import { KeyBenefits } from '@/components/sections/KeyBenefits';
import { Solutions } from '@/components/sections/Solutions';
import { Products } from '@/components/sections/Products';
import { Showcase } from '@/components/sections/Showcase';
import { ContactForm } from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <main className="bg-background min-h-screen selection:bg-rocket-red selection:text-white transition-colors duration-300">
      <Navbar />
      <Hero />
      <SocialProof />
      <AEAArchitecture />
      <KeyBenefits />
      <Solutions />
      <Products />
      <Showcase />
      <ContactForm />

      {/* Footer */}
      <footer className="py-20 border-t border-border text-center text-gray-500 text-sm">
        <p>© 2026 Rocketbot. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}