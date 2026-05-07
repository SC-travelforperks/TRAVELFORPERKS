'use client'

import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { About } from './components/About';
import { StrengthSection } from './components/StrengthSection';
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
import type { Deal, Review, GalleryItem, BlogPost, SocialPost, AboutStat } from '@/lib/notion';
import { trackEvent } from '@/lib/analytics';

interface AppProps {
  deals: Deal[];
  reviews: Review[];
  gallery: GalleryItem[];
  blogs: BlogPost[];
  socialPosts: SocialPost[];
  aboutStats: AboutStat[];
}

export default function App({ deals, reviews, gallery, blogs, socialPosts, aboutStats }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation onPlanClick={() => { trackEvent('enquiry_modal_open', { source: 'nav' }); setIsModalOpen(true); }} />
      <Hero onEnquire={() => { trackEvent('enquiry_modal_open', { source: 'hero' }); setIsModalOpen(true); }} />
      <TrustBar />
      <About onEnquire={() => { trackEvent('enquiry_modal_open', { source: 'about' }); setIsModalOpen(true); }} />
      <StrengthSection stats={aboutStats} />
      <Services onEnquire={() => { trackEvent('enquiry_modal_open', { source: 'services' }); setIsModalOpen(true); }} />
      <Process onEnquire={() => { trackEvent('enquiry_modal_open', { source: 'process' }); setIsModalOpen(true); }} />
      <Deals deals={deals} />
      <Reviews reviews={reviews} />
      <Gallery galleryItems={gallery} />
      <Blogs posts={blogs} />
      {socialPosts.length > 0 && <SocialSection posts={socialPosts} />}
      <FAQs />
      <Footer onPlanClick={() => { trackEvent('enquiry_modal_open', { source: 'footer' }); setIsModalOpen(true); }} />
      <FloatingContact onEnquiryClick={() => { trackEvent('enquiry_modal_open', { source: 'floating_button' }); setIsModalOpen(true); }} />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
