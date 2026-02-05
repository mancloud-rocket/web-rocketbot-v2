'use client';

import { Navbar } from '@/components/ui/Navbar';
import { HistoryTimeline } from '@/components/sections/HistoryTimeline';

export default function NuestraHistoriaPage() {
  return (
    <main className="bg-background min-h-screen selection:bg-rocket-red selection:text-white transition-colors duration-300 overflow-x-hidden">
      <Navbar />

      {/* 
        The entire cinematic experience (Intro + Timeline) 
        is now unified in the HistoryTimeline component to ensure 
        perfect synchronization and avoid visual overlap.
      */}
      <HistoryTimeline />

      {/* 
        Footer is integrated at the very end of the scrollytelling path 
        if needed, or kept separate here if the timeline ends gracefully. 
      */}
    </main>
  );
}

