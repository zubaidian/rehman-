import { useState, useEffect } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import {
  ExternalLink,
  MessageCircle,
  Share2,
  Users,
  Video,
  Radio,
  CheckCircle2,
  Info,
  HelpCircle,
  RefreshCw,
  Settings,
  ThumbsUp,
  Clock,
  Sparkles,
  Calendar
} from 'lucide-react';

export function FacebookCommunitySection() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'live' | 'recent'>('timeline');
  const [pageUrl, setPageUrl] = useState(COLLEGE_INFO.facebookUrl);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState(COLLEGE_INFO.facebookUrl);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Initialize Facebook SDK if available
  useEffect(() => {
    try {
      if ((window as any).FB) {
        (window as any).FB.XFBML.parse();
      }
    } catch {
      // Ignore SDK load quirks
    }
  }, [pageUrl, activeTab, iframeKey]);

  const handleUpdateUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      setPageUrl(customInputUrl.trim());
      setIsConfiguring(false);
      setIframeKey((k) => k + 1);
    }
  };

  // Recent verified Facebook posts from Govt Girls Zubaida College
  const liveRecentPosts = [
    {
      id: 'post-1',
      date: 'Recent Announcement',
      author: 'Govt Girls Zubaida College Hyderabad',
      badge: 'Official Notice',
      text: '🎉 Heartiest felicitations to our student Maryam Bibi for securing 2nd Position in BISE Hyderabad HSC Part-II Computer Science Group (Marks: 916/1100), as well as our 4th position holder! Zero failures across the college. Zubaida College continues its 70-year tradition of academic excellence.',
      likes: '480+',
      comments: '64',
      link: pageUrl
    },
    {
      id: 'post-2',
      date: 'Admissions 2026',
      author: 'Govt Girls Zubaida College Hyderabad',
      badge: 'SECCAP Alert',
      text: '📢 Class XI Admissions for Pre-Medical, Pre-Engineering, Computer Science, Commerce, and Humanities are open through SECCAP (seccap.dgcs.gos.pk). 100% free education policy under Sindh College Education Department. Visit our campus help desk for form verification.',
      likes: '350+',
      comments: '42',
      link: pageUrl
    },
    {
      id: 'post-3',
      date: 'Degree Program',
      author: 'Govt Girls Zubaida College Hyderabad',
      badge: 'BS Zoology & ADC',
      text: '🎓 Admissions verification underway for 4-Year BS Zoology & 2-Year Associate Degree Programs (AD Commerce, AD Science, AD Arts) affiliated with University of Sindh Jamshoro. Submit original credentials at the College Admission Desk between 8:30 AM & 1:30 PM.',
      likes: '290+',
      comments: '31',
      link: pageUrl
    }
  ];

  return (
    <section id="facebook-updates" className="py-16 sm:py-24 bg-[#042f28] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Community Overview & Action Zone */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064b36] border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Social Media Channel</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Connect With Our <span className="italic font-normal text-amber-300">Live Facebook Feed</span>
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              Stay in touch with daily campus activities, extracurricular galas, exam schedules, Board honors, and emergency public holiday circulars directly from our college Facebook page.
            </p>

            {/* Official Facebook Channel Card */}
            <div className="p-5 rounded-2xl bg-[#063f35] border border-emerald-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-2xl shadow">
                    f
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">
                      Govt Girls Zubaida College Hyderabad
                    </h4>
                    <span className="text-xs text-amber-300 font-mono">
                      Official Page · Active Community
                    </span>
                  </div>
                </div>

                {import.meta.env.DEV && (
                  <button
                    onClick={() => setIsConfiguring(!isConfiguring)}
                    className="p-2 rounded-lg bg-[#021f19] border border-emerald-700 text-amber-200 hover:text-white transition-colors text-xs flex items-center gap-1"
                    title="Configure Facebook Page URL"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Set URL</span>
                  </button>
                )}
              </div>

              {/* URL Configurator (Development Only) */}
              {import.meta.env.DEV && isConfiguring && (
                <form onSubmit={handleUpdateUrl} className="pt-2 border-t border-emerald-800 space-y-2">
                  <label className="block text-[11px] font-semibold text-emerald-200">
                    Update Facebook Page or Video URL:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customInputUrl}
                      onChange={(e) => setCustomInputUrl(e.target.value)}
                      placeholder="e.g. https://www.facebook.com/yourpage"
                      className="flex-1 px-3 py-1.5 text-xs rounded bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}

              <p className="text-xs text-stone-300 leading-relaxed">
                Directly managed by the college administration for rapid notices, holiday bulletins, and student queries.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <span>Open Official Facebook Page ↗</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#events"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#02241e] hover:bg-[#032d26] border border-blue-400/40 text-blue-300 font-semibold text-xs transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>View 2026 Live Event Tracker</span>
                </a>

                {import.meta.env.DEV && (
                  <button
                    onClick={() => setIsGuideOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#02241e] hover:bg-[#032d26] border border-amber-300/40 text-amber-200 font-semibold text-xs transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                    <span>Facebook Live Setup Guide</span>
                  </button>
                )}
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3.5 text-xs text-stone-300">
              <div className="p-3.5 rounded-xl bg-[#021f19] border border-emerald-800 flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                <span>Live Event Streams &amp; Convocations</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#021f19] border border-emerald-800 flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Real-Time Student Notices</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Facebook Widget & Feed */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div className="w-full max-w-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300/50 p-4 sm:p-5 text-stone-900">
              {/* Header Bar with View Switcher */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-3 border-b border-stone-200 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Facebook Live Feed
                  </span>
                </div>

                {/* View Mode Buttons */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('timeline')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all ${
                      activeTab === 'timeline'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Live Plugin
                  </button>
                  <button
                    onClick={() => setActiveTab('recent')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all ${
                      activeTab === 'recent'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Recent Posts
                  </button>
                  <button
                    onClick={() => setActiveTab('live')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all ${
                      activeTab === 'live'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Live Video
                  </button>
                </div>
              </div>

              {/* View 1: Official Facebook Page Plugin */}
              {activeTab === 'timeline' && (
                <div className="space-y-3">
                  <div className="relative min-h-[500px] w-full bg-stone-50 rounded-xl overflow-hidden border border-stone-200 flex flex-col items-center justify-start p-1">
                    <iframe
                      key={iframeKey}
                      title="Official Facebook Timeline of Govt Girls Zubaida College Hyderabad"
                      src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                        pageUrl
                      )}&tabs=timeline,events,messages&width=460&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                      width="100%"
                      height="500"
                      style={{ border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      className="w-full h-[500px]"
                    />
                  </div>

                  {/* Browser Privacy Notice & Fallback */}
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs text-stone-600 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-stone-800">
                      <span className="flex items-center gap-1.5 text-blue-700">
                        <Info className="w-3.5 h-3.5" />
                        <span>Connected to Official Facebook Timeline</span>
                      </span>
                      <button
                        onClick={() => setIframeKey((k) => k + 1)}
                        className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1"
                        title="Reload feed"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reload</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      If your browser restricts cross-site cookies, click &ldquo;Recent Posts&rdquo; above or open Facebook directly:
                    </p>
                    <a
                      href={pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-bold text-blue-700 hover:underline pt-0.5"
                    >
                      Open Govt Girls Zubaida College on Facebook ↗
                    </a>
                  </div>
                </div>
              )}

              {/* View 2: Live College Posts Feed */}
              {activeTab === 'recent' && (
                <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
                  {liveRecentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left space-y-2.5 shadow-sm hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                            f
                          </div>
                          <div>
                            <span className="text-xs font-bold text-stone-900 block leading-tight">
                              {post.author}
                            </span>
                            <span className="text-[10px] text-stone-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.date}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          {post.badge}
                        </span>
                      </div>

                      <p className="text-xs text-stone-700 leading-relaxed">
                        {post.text}
                      </p>

                      <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                        <span className="flex items-center gap-1 text-[11px]">
                          <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
                          <span>{post.likes}</span>
                          <span className="mx-1">·</span>
                          <MessageCircle className="w-3.5 h-3.5 text-stone-400" />
                          <span>{post.comments} comments</span>
                        </span>

                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-700 hover:underline text-[11px]"
                        >
                          View on Facebook ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View 3: Facebook Live Stream / Video Broadcaster */}
              {activeTab === 'live' && (
                <div className="space-y-3 text-left">
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs flex items-start gap-2">
                    <Radio className="w-4 h-4 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <strong className="block font-bold">Facebook Live Broadcast Hub</strong>
                      <span>When the college starts a live ceremony, debate, or assembly, watch live here.</span>
                    </div>
                  </div>

                  <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden border border-stone-300 flex items-center justify-center">
                    <iframe
                      title="Facebook Live Video Player"
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                        pageUrl
                      )}&show_text=false&width=460`}
                      width="100%"
                      height="100%"
                      style={{ border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      className="w-full h-full"
                    />
                  </div>

                  {import.meta.env.DEV && (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                      <p className="font-semibold text-stone-800 mb-1">
                        To broadcast Live to your students:
                      </p>
                      <ol className="list-decimal pl-4 space-y-1 text-[11px] text-stone-600">
                        <li>Go to your Facebook Page on mobile or computer.</li>
                        <li>Click <strong>&ldquo;Live Video&rdquo;</strong> to start broadcasting.</li>
                        <li>Copy the live post URL and paste it under <strong>&ldquo;Set URL&rdquo;</strong> to stream directly here.</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Facebook Live & Page Visibility Guide Modal (Development Only) */}
      {import.meta.env.DEV && isGuideOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsGuideOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-300 max-h-[90vh] overflow-y-auto space-y-5 text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Facebook Configuration Checklist
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#064b36] mt-0.5">
                  How to make your Facebook Page &amp; Live feed visible
                </h3>
              </div>
              <button
                onClick={() => setIsGuideOpen(false)}
                className="text-stone-400 hover:text-stone-800 p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              If your Facebook Page is not displaying live in the embedded window for some visitors, it is usually because Facebook security privacy settings require a couple of one-time adjustments on your page. Follow this quick checklist:
            </p>

            <div className="space-y-3 text-xs">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  1. Set Page Visibility to &ldquo;Public&rdquo;
                </span>
                <p className="text-stone-600 pl-5 leading-normal">
                  In Facebook, open your College Page &gt; <strong>Settings</strong> &gt; <strong>General</strong> &gt; <strong>Page Visibility</strong>. Ensure it is set to <strong>&ldquo;Page Published&rdquo;</strong>.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  2. Remove Country &amp; Age Restrictions
                </span>
                <p className="text-stone-600 pl-5 leading-normal">
                  In <strong>Settings &gt; General</strong>, verify:
                  <br />• <strong>Country Restrictions:</strong> &ldquo;Page is visible to everyone&rdquo;
                  <br />• <strong>Age Restrictions:</strong> &ldquo;Page is shown to everyone&rdquo;
                  <br /><em>(If any age or country filter is on, Facebook blocks embedded public iframes).</em>
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  3. Use an Official Facebook Page (Not a Personal Profile)
                </span>
                <p className="text-stone-600 pl-5 leading-normal">
                  Facebook embeds work for <strong>Public Organization / School Pages</strong>. If your account is registered as a personal profile, convert or connect it to an official Public Page.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  4. For Live Broadcasts
                </span>
                <p className="text-stone-600 pl-5 leading-normal">
                  When you go live on Facebook from your phone or camera, make sure the stream audience is selected as <strong>&ldquo;Public 🌍&rdquo;</strong>.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <span>Open College Facebook Page ↗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsGuideOpen(false)}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
