import React from 'react';
import { ArrowUpRight, ArrowRight, Layers, Award } from 'lucide-react';

const VolunteerAboutSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading, Subtitle, Stats & CTA */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Empowering Communities Through Volunteer Action
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              Amader platform-e hazar hazar swecchasebok ekshathe kaj korche community development ebong samajik unnoyoner jonno. Apni-o amader sathe jukto hoye somaj-e itibachok poriborton ante paren.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
                15
              </span>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 leading-tight">
                Years of <br /> Service
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
                420+
              </span>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 leading-tight">
                Completed <br /> Projects
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <a
              href="#discover"
              className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold uppercase tracking-wider text-sm group border-b-2 border-emerald-600 dark:border-emerald-400 pb-1 transition-all"
            >
              Discover More
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Center Column: Image Container */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Volunteer Team Collaboration"
              className="w-full h-[400px] lg:h-[480px] object-cover"
            />
          </div>
        </div>

        {/* Right Column: Key Highlights / Features */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Feature Item 1 */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Community Outreach
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Sorasori sthaniyo elakay shikkha, swasthyo ebong poribesh rokkhar jonno proactive initiatives execution kora hoy.
            </p>
          </div>

          {/* Feature Item 2 */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Structured Operations
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Every single campaign and event proper planning ebong efficiency-er sathe team manage kora hoy.
            </p>
          </div>

          {/* Bullet List Items */}
          <ul className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
              <span>Transparent management & real-time activity updates.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
              <span>Dedicated leader support for all volunteer teams.</span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
};

export default VolunteerAboutSection;