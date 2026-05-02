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
import { SocialSection } from './components/SocialSection';
import { FAQs } from './components/FAQs';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { FloatingContact } from './components/FloatingContact';
import type { Deal, Review, GalleryItem, BlogPost, SocialPost } from '@/lib/notion';

interface AppProps {
  deals: Deal[];
  reviews: Review[];
  gallery: GalleryItem[];
  blogs: BlogPost[];
  socialPosts: SocialPost[];
}

export default function App({ deals, reviews, gallery, blogs, socialPosts }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation onPlanClick={() => setIsModalOpen(true)} />
      <Hero onEnquire={() => setIsModalOpen(true)} />
      <TrustBar />
      <About />
      <Services onEnquire={() => setIsModalOpen(true)} />
      <Process />
      <Deals deals={deals} />
      <Reviews reviews={reviews} />
      <Gallery galleryItems={gallery} />
      <Blogs posts={blogs} />
      {socialPosts.length > 0 && <SocialSection posts={socialPosts} />}
      <FAQs />
      <Footer onPlanClick={() => setIsModalOpen(true)} />
      <FloatingContact onEnquiryClick={() => setIsModalOpen(true)} />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
