import React from 'react';
import { ExternalLink, MessageSquare, Phone, Send, X } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
        aria-label="Close menu"
      >
        <X size={24} />
      </button>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-light mb-6">Contact</h2>
          <div className="flex flex-wrap gap-6 mb-12">
            <a 
              href="https://www.simonives.com.au/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-gray-600 transition-colors"
            >
              <MessageSquare size={20} />
              <span>Contact Form</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href="https://www.simonives.com.au/whatsapp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-gray-600 transition-colors"
            >
              <Phone size={20} />
              <span>WhatsApp</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href="https://t.me/simon_ives" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-gray-600 transition-colors"
            >
              <Send size={20} />
              <span>Telegram</span>
              <ExternalLink size={16} />
            </a>
          </div>

          <picture className="block mt-12 mb-16">
            <source 
              media="(min-width: 640px)" 
              srcSet="https://res.cloudinary.com/ives-media/image/upload/f_auto/v1734169828/photoblog%20assets/IMG_9926-4-cover_olskk5.jpg" 
            />
            <img
              src="https://res.cloudinary.com/ives-media/image/upload/w_500,h_500,c_limit,e_sharpen:75,f_auto/v1734169828/photoblog%20assets/IMG_9926-4-cover_olskk5.jpg"
              alt="Featured photograph"
              className="w-full aspect-[21/9] object-cover"
            />
          </picture>

          <div className="space-y-6">
            <h2 className="text-3xl font-light">About</h2>
            <p className="text-lg italic">
              "I try to captures juxtaposing, humourous, semi-abstract images highlighting the upside down, absurd, and beautiful ideas and impressions that can be discovered amid the everyday urban and natural environments, seeking to find the extraordinary in the ordinary."
            </p>
            <div className="space-y-4">
              <p>Simon is an award winning documentary film maker, former wedding photographer and studio owner, and urban / street photographer in Phnom Penh Cambodia, where he resides with his beautiful family.</p>
              <p>He is the co-founder of Milk and Honey English School and more recently <a href="https://www.freedominternational.org" target="_blank" rel="noopener noreferrer" className="text-red-900">Freedom International</a>, with his wife Kamini. Freedom International prevents human trafficking through education in developing nations.</p>
              <p>As a committed Christian Simon's passion project is <a href="https://www.instillapp.com" target="_blank" rel="noopener noreferrer" className="text-red-900">Instill Kids Bedtime Prayer</a>, a personalised prayer app for children that establishes their God-given identity and encourages peaceful sleep.</p>
              <p>Simon has <a href="https://www.simonives.com.au" target="_blank" rel="noopener noreferrer" className="text-red-900">extensive experience</a> in building apps, chatbots and advanced websites for the charity and ministry sectors freelance, and was global marketing specialist for Christian Vision before moving to Phnom Penh in 2019.</p>
              <p>Simon is the proud parent of Ravi and Elysabeth, and husband of Kamini, and is accompanied on his exploration throught the streets of Phnom Penh by his golden retriever Esther.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 px-6 bg-black text-white hover:bg-black/90 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}