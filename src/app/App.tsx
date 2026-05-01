'use client'

import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Deals } from './components/Deals';
import { Reviews } from './components/Reviews';
import { Gallery } from './components/Gallery';
import { Blogs } from './components/Blogs';
import { FAQs } from './components/FAQs';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import type { Deal, Review, GalleryItem } from '@/lib/notion';

interface AppProps {
  deals: Deal[];
  reviews: Review[];
  gallery: GalleryItem[];
}

export default function App({ deals, reviews, gallery }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation onPlanClick={() => setIsModalOpen(true)} />
      <Hero onPlanClick={() => setIsModalOpen(true)} />
      <TrustBar />
      <About />
      <Services />
      <Process />
      <Deals deals={deals} />
      <Reviews reviews={reviews} />
      <Gallery galleryItems={gallery} />
      <Blogs />
      <FAQs />
      <Footer onPlanClick={() => setIsModalOpen(true)} />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
