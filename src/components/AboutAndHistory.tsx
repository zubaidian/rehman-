import { COLLEGE_INFO, TIMELINE_EVENTS } from '../data/collegeData';
import { History, Milestone, Compass, Quote, Play } from 'lucide-react';

export function AboutAndHistory() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#064b36] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042f28] border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>About Govt Girls Zubaida College</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              A Future Shaped By <span className="italic font-normal text-amber-300">Possibility.</span>
            </h2>

            <p className="text-amber-100/95 text-lg sm:text-xl font-serif italic leading-relaxed">
              &ldquo;Education is more than a qualification. It is the confidence to ask questions, the courage to imagine, and the ability to make a lasting difference in the world.&rdquo;
            </p>

            <div className="space-y-4 text-stone-200 text-base leading-relaxed">
              <p>
                Government Girls Zubaida College Hyderabad is one of the oldest, most prestigious, and revered educational landmarks in Sindh. Established in 1953, the college answered an urgent historical calling: providing higher secondary and collegiate education for young women in Hyderabad at a time when such opportunities were severely limited.
              </p>
              <p>
                Guided continuously by our sacred motto <strong className="text-amber-300 font-serif italic">&ldquo;SERVICE ABOVE SELF&rdquo;</strong>, Zubaida College has nurtured three generations of visionary women. Today, our distinguished alumni serve as renowned doctors, professors, scientists, judges, educators, and leaders across Pakistan and around the globe.
              </p>
              <p>
                It is far more than an educational building — it is the living embodiment of the bright futures and aspirations of the daughters of Hyderabad.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-sm font-semibold">
              <div className="flex items-center gap-2 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Established 1953</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>2,000 Enrolled Students</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Motto: Service Above Self</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Sindh Education Dept. Affiliation</span>
              </div>
            </div>
          </div>

          {/* Visual Column: Campus Gate & Pull Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-[#042f28]">
              <img
                src={COLLEGE_INFO.images.campus}
                alt="Historic Entrance of Govt Girls Zubaida College"
                className="w-full h-72 sm:h-80 object-cover object-center"
              />
              <div className="p-4 bg-[#042f28] text-xs text-stone-300 flex items-center justify-between border-t border-emerald-800">
                <span className="font-semibold text-amber-200">Main Campus Gateway</span>
                <span>Opposite Central Jail, Pathan Colony, Hirabad</span>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 rounded-2xl bg-[#042f28] border-2 border-amber-300/60 shadow-xl relative text-left">
              <Quote className="w-8 h-8 text-amber-400/40 absolute top-4 right-4" />
              <p className="font-serif italic text-lg sm:text-xl text-amber-200 leading-snug">
                &ldquo;Every student deserves the dignity and opportunity to discover just how far her intellect and potential can take her.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white tracking-wider uppercase">
                  The Spirit of Learning
                </span>
                <span className="text-amber-300 font-serif">Govt Girls Zubaida College</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Decade Timeline */}
        <div id="history" className="mt-20 pt-16 border-t border-emerald-800">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042f28] border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <History className="w-3.5 h-3.5" />
              <span>Historical Milestones</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Seven Decades of Empowering Sindh&rsquo;s Daughters
            </h3>
            <p className="text-sm text-stone-300">
              A journey of perseverance, educational equity, and academic distinction from 1953 to the present.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE_EVENTS.map((event, index) => (
              <div
                key={event.year}
                className="p-6 rounded-xl bg-[#042f28] border border-amber-300/30 hover:border-amber-300 transition-colors shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      0{index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-xs tracking-wider">
                      {event.year}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white mb-2">
                    {event.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Historical Video / Archive Box (Development Only until archive video is linked) */}
          {import.meta.env.DEV && (
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#042f28] border border-amber-300/40 max-w-4xl mx-auto shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-full sm:w-64 h-40 rounded-xl overflow-hidden bg-black shrink-0 border border-emerald-700 flex items-center justify-center">
                  <img
                    src={COLLEGE_INFO.images.campus}
                    alt="Zubaida College History Video Poster"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-400/90 text-emerald-950 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                    Campus Archive
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white">
                    A Glimpse of Zubaida College Hyderabad
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Experience the living heritage, classrooms, and student community of our storied institution. Archived video footage and special retrospectives are maintained in our college multimedia center.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
