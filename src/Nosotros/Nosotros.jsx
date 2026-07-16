import React from 'react';
import NosotrosHero from './NosotrosHero';
import NosotrosTimeline from './NosotrosTimeline';
import ManifestoSection from './ManifestoSection';
import ValuesFlower from './ValuesFlower';
import PurposeSection from './PurposeSection';
import WhatDrivesUs from './WhatDrivesUs';
import TalentCulture from './TalentCulture';
import CallToAction from './CallToAction';

export default function Nosotros() {
  return (
    <div className="bg-black text-white font-sans selection:bg-qualtop-orange overflow-x-clip">
      <NosotrosHero />
      <NosotrosTimeline />
      <ManifestoSection />
      <ValuesFlower />
      <PurposeSection />
      <WhatDrivesUs />
      <TalentCulture />
      <CallToAction />
    </div>
  );
}