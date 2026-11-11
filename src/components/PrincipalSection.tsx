import { COLLEGE_INFO } from '../data/collegeData';
import { Award, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

export function PrincipalSection() {
  return (
    <section id="principal" className="py-16 sm:py-24 bg-[#042f28] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Principal's Photo Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group max-w-sm w-full rounded-2xl overflow-hidden border-2 border-amber-300 shadow-2xl bg-[#02251f] p-3">
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-stone-900">
                <img
                  src={COLLEGE_INFO.images.principal}
                  alt="Principal Professor Yasmin Panhwar - Govt Girls Zubaida College Hyderabad"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="block text-xs font-mono uppercase tracking-widest text-amber-300">
                    Principal&rsquo;s Desk
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white mt-1">
                    Prof. Yasmin Panhwar
                  </h3>
                  <span className="text-xs text-stone-300">
                    Govt Girls Zubaida College Hyderabad
                  </span>
                </div>
              </div>

              {/* Photo Caption Strip */}
              <div className="mt-3 p-3 bg-[#03221c] rounded-lg border border-emerald-800 text-center text-xs">
                <span className="block font-semibold text-amber-300 tracking-wider uppercase">
                  Leadership · Learning · Service
                </span>
                <span className="text-stone-300 text-[11px]">
                  Fostering academic distinction and moral uprightness
                </span>
              </div>
            </div>

            {/* Quick Badges below photo */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-stone-300">
              <span className="px-3 py-1 rounded-full bg-[#063f35] border border-amber-300/30 flex items-center gap-1.5 text-amber-200">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Safe Campus
              </span>
              <span className="px-3 py-1 rounded-full bg-[#063f35] border border-amber-300/30 flex items-center gap-1.5 text-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Modern Education
              </span>
              <span className="px-3 py-1 rounded-full bg-[#063f35] border border-amber-300/30 flex items-center gap-1.5 text-amber-200">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-300" /> Islamic Values
              </span>
            </div>
          </div>

          {/* Principal's Message Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064b36] border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Leadership Address</span>
            </div>

            <div className="space-y-2">
              <p className="font-serif italic text-base text-amber-200">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-xs text-stone-300 uppercase tracking-widest font-semibold">
                In the Name of Allah, the Most Beneficent, the Most Merciful
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white pt-2">
                Message from the <span className="text-amber-300 italic font-normal">Principal</span>
              </h2>
            </div>

            <div className="space-y-4 text-stone-200 text-base sm:text-lg leading-relaxed border-l-2 border-amber-400/40 pl-5">
              <p>
                <strong className="text-white">Welcome to Government Girls Zubaida College, Hyderabad.</strong>
              </p>
              <p>
                Since its establishment in 1953, this prestigious institution has been illuminating the daughters of Hyderabad with the sacred light of knowledge, faithfully upholding the golden principle of <span className="text-amber-300 font-serif italic">&ldquo;SERVICE ABOVE SELF&rdquo;</span>.
              </p>
              <p>
                Our mission transcends merely conferring intermediate certificates and degree credentials. We are committed to nurturing daughters who are intellectually accomplished, virtuous, self-reliant, and confident citizens who will bring enduring honor to our province and nation.
              </p>
              <p>
                Here, alongside modern scientific inquiry, digital literacy, and academic rigor, we place paramount emphasis on character building, Islamic values, and moral rectitude. My faculty colleagues, administrative staff, and I strive tirelessly to provide every student with a safe, dignified, inspiring, and positive learning sanctuary.
              </p>
              <p className="font-serif italic text-amber-200 pt-2">
                May Allah the Almighty grant every student and daughter continuous success in both academic pursuits and life.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-800/80">
              <h4 className="font-serif font-bold text-xl text-white">
                Professor Yasmin Panhwar
              </h4>
              <p className="text-xs text-amber-300 font-semibold tracking-wider uppercase mt-0.5">
                Principal, Government Girls Zubaida College, Hyderabad
              </p>
              <p className="text-xs text-stone-400 mt-1">
                College Education Department · Government of Sindh
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
