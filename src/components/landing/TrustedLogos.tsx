
import React from 'react';
import { ShieldCheck } from "lucide-react";

const TrustedLogos = () => {
  const clientLogos = [
    "/placeholder.svg", // Replace with actual client logos
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  const securityBadges = [
    { icon: <ShieldCheck size={20} />, label: "GDPR Compliant" },
    { icon: <ShieldCheck size={20} />, label: "SOC 2" },
    { icon: <ShieldCheck size={20} />, label: "SSL Encrypted" }
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wider">Trusted By Leading SMBs</p>
        </div>

        {/* Client Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
          {clientLogos.map((logo, index) => (
            <div key={index} className="group">
              <img 
                src={logo} 
                alt={`Client logo ${index + 1}`} 
                className="h-12 md:h-16 opacity-50 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" 
              />
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {securityBadges.map((badge, index) => (
            <div 
              key={index} 
              className="flex items-center text-gray-600"
            >
              <span className="mr-2 text-[#8B5CF6]">{badge.icon}</span>
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedLogos;
