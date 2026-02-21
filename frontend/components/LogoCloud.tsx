import React from 'react';

interface Logo {
  name: string;
  src: string;
  width: string;
}

const LOGO_DATA: Logo[] = [
  { name: 'Nvidia', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707880/Homepage/logos/logo-nvidia_gemiej.svg', width: '96px' },
  { name: 'Airbnb', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707877/Homepage/logos/logo-airbnb_g12enf.svg', width: '80px' },
  { name: 'Meta', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707880/Homepage/logos/logo-meta_mk2whc.svg', width: '80px' },
  { name: 'Lowe\'s', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707880/Homepage/logos/logo-lowes_uym94p.svg', width: '56px' },
  { name: 'Disney', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707877/Homepage/logos/logo-disney_ihzgrw.svg', width: '72px' },
  { name: 'Samsung', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707879/Homepage/logos/logo-samsung_whgc8m.svg', width: '88px' },
  { name: 'Mastercard', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707879/Homepage/logos/logo-mastercard_izf5ma.svg', width: '128px' },
  { name: 'Siemens', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707877/Homepage/logos/logo-siemens_igswic.svg', width: '96px' },
  { name: 'Experian', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1764885038/Homepage/logos/logo-experian_wqlpwv.svg', width: '104px' },
  { name: 'HP', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707878/Homepage/logos/logo-hp_igcbxw.svg', width: '32px' },
  { name: 'Cursor', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707880/Homepage/logos/logo-cursor_hklrpe.svg', width: '104px' },
  { name: 'Okta', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1764707877/Homepage/logos/logo-okta_hspwvl.svg', width: '96px' },
];

const LogoCloud: React.FC = () => {
  return (
    <section className="w-full pt-4 pb-25 bg-white border-y border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with extending line */}
        <div className="flex items-center mb-12 opacity-60">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap pr-4">
            Trusted by the world's best companies
          </span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-3 lg:grid-cols-6 items-center justify-items-center">
          {LOGO_DATA.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              style={{ width: logo.width }}
              className="h-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;