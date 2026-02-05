import { Metadata } from 'next';
import { PricingScrollytelling } from '@/components/sections/PricingScrollytelling';

export const metadata: Metadata = {
    title: 'Pricing | Rocketbot Suite',
    description: 'Elige el plan de automatización perfecto para tu empresa. Desde RPA básico hasta agentes de IA autónomos.',
    openGraph: {
        title: 'Pricing | Rocketbot Suite',
        description: 'Elige el plan de automatización perfecto para tu empresa.',
        images: ['/og-pricing.jpg'],
    },
};

export default function PricingPage() {
    return <PricingScrollytelling />;
}
