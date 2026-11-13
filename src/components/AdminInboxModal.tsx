import { useEffect, useState } from 'react';
import {
  X,
  Mail,
  Inbox,
  Users,
  GraduationCap,
  Trash2,
  Copy,
  Check,
  Download,
  LogOut,
  Lock,
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';
import {
  AlumnaRegistrationRecord,
  deleteAlumnaRegistration,
  deleteInquiry,
  deleteSubscriber,
  InquiryRecord,
  subscribeAdminAlumnae,
  subscribeAdminInquiries,
  subscribeAdminSubscribers,
  SubscriberRecord,
  updateAlumnaStatus,
  updateInquiryStatus,
  updateSubscriberStatus,
} from '../services/collegeSubmissions';

interface AdminInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatTimestamp(ts: Timestamp | null): string {
  if (!ts) return 'Just now';
  try {
    return ts.toDate().toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function AdminInboxModal({ isOpen, onClose }: AdminInboxModalProps) {
  const { user, authReady, isAdmin, signInWithGoogle, signOutUser } = useFirebase();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'subscribers' | 'alumnae'>('inquiries');
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [alumnae, setAlumnae] = useState<AlumnaRegistrationRecord[]>([]);
  const [authError, setAuthError] = useState('');
  const [dataError, setDataError] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    if (!isOpen || !authReady || !user || !isAdmin) return;

    setDataError('');
    const unsubInq = subscribeAdminInquiries(setInquiries, (err) => setDataError(err.message));
    const unsubSub = subscribeAdminSubscribers(setSubscribers, (err) => setDataError(err.message));
    const unsubAlu = subscribeAdminAlumnae(setAlumnae, (err) => setDataError(err.message));

    return () => {
      unsubInq();
      unsubSub();
      unsubAlu();
    };
  }, [isOpen, authReady, user, isAdmin]);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : 'Unable to complete Google sign-in.'
      );
    }
  };

  const handleCopyAllEmails = async () => {
    const activeEmails = Array.from(
      new Set(subscribers.filter((s) => s.status === 'active').map((s) => s.email))
    );
    if (activeEmails.length === 0) return;
    try {
      await navigator.clipboard.writeText(activeEmails.join(', '));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleExportSubscribersCsv = () => {
    const rows = [
      ['Email', 'Status', 'Subscribed At'],
      ...subscribers.map((s) => [s.email, s.status, formatTimestamp(s.createdAt)]),
    ];
    const csv = rows
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zubaida-college-newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-200 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
          aria-label="Close admin portal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6 pb-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Government Girls Zubaida College Hyderabad
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#064b36] mt-0.5">
              College Enquiries &amp; Subscribers Inbox
            </h3>
          </div>

          {user && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-stone-600 font-mono truncate max-w-[200px]">
                {user.email}
              </span>
              <button
                onClick={signOutUser}
                className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {!authReady ? (
          <div className="py-12 text-center text-sm text-stone-600">
            Checking administrator session...
          </div>
        ) : !user ? (
          <div className="py-10 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-[#064b36] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-stone-900">
              Administrator Sign-In Required
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sign in with the official college Google account (<strong>zubaidaisbest@gmail.com</strong>) to view student enquiries, newsletter subscriber emails, and alumnae registrations.
            </p>
            {authError && (
              <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                {authError}
              </p>
            )}
            <button
              onClick={handleSignIn}
              className="px-6 py-3 bg-[#064b36] hover:bg-[#042f28] text-white rounded-xl font-bold text-xs shadow-md transition-all"
            >
              Sign In with Google
            </button>
          </div>
        ) : !isAdmin ? (
          <div className="py-10 text-center space-y-4 max-w-md mx-auto">
            <h4 className="font-serif text-xl font-bold text-rose-800">
              Access Restricted
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Signed in as <strong>{user.email}</strong>. Inbox access is restricted to the authorized college administrator account (<strong>zubaidaisbest@gmail.com</strong>).
            </p>
            <button
              onClick={signOutUser}
              className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold"
            >
              Sign Out &amp; Switch Account
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {dataError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {dataError}
              </div>
            )}

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-[#064b36] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Inquiries ({inquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('subscribers')}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'subscribers'
                    ? 'bg-[#064b36] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Newsletter Subscribers ({subscribers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('alumnae')}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'alumnae'
                    ? 'bg-[#064b36] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Alumnae Registrations ({alumnae.length})</span>
              </button>
            </div>

            {/* Tab 1: Inquiries */}
            {activeTab === 'inquiries' && (
              <div className="space-y-3">
                {inquiries.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                    No enquiries received yet. New submissions from the website forms will appear here automatically.
                  </div>
                ) : (
                  inquiries.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#064b36]">
                            {item.name} — <span className="text-stone-700 font-sans text-xs font-semibold">{item.subject}</span>
                          </h4>
                          <p className="text-xs text-stone-600 font-mono mt-0.5">
                            {item.email}
                            {item.phone ? ` · ${item.phone}` : ''}
                            {' · '}
                            {formatTimestamp(item.createdAt)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateInquiryStatus(
                                item.id,
                                e.target.value as 'new' | 'reviewed' | 'resolved'
                              )
                            }
                            className="px-2.5 py-1 rounded border border-stone-300 bg-white text-xs font-semibold text-stone-800"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="resolved">Resolved</option>
                          </select>

                          <button
                            onClick={() => deleteInquiry(item.id)}
                            className="p-1.5 rounded text-rose-700 hover:bg-rose-100"
                            title="Delete enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-stone-800 leading-relaxed bg-white p-3 rounded-lg border border-stone-200">
                        {item.message}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span>Source: {item.source === 'quick_modal' ? 'Quick Enquiry Modal' : 'Contact Page Form'}</span>
                        <a
                          href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject} - Govt Girls Zubaida College`)}`}
                          className="font-bold text-[#064b36] hover:underline"
                        >
                          Reply via Email ↗
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Newsletter Subscribers */}
            {activeTab === 'subscribers' && (
              <div className="space-y-4">
                {subscribers.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-xs text-stone-700 font-medium flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#064b36]" />
                      <span>
                        {subscribers.filter((s) => s.status === 'active').length} active subscriber(s)
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyAllEmails}
                        className="px-3 py-1.5 rounded-lg bg-[#064b36] hover:bg-[#042f28] text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAll ? 'Copied All Emails' : 'Copy Active Emails'}</span>
                      </button>
                      <button
                        onClick={handleExportSubscribersCsv}
                        className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>
                )}

                {subscribers.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                    No newsletter subscribers yet.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden">
                    {subscribers.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-stone-900">{sub.email}</span>
                          <span className="text-stone-500 ml-2">
                            · {formatTimestamp(sub.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={sub.status}
                            onChange={(e) =>
                              updateSubscriberStatus(
                                sub.id,
                                e.target.value as 'active' | 'unsubscribed'
                              )
                            }
                            className="px-2 py-1 rounded border border-stone-300 bg-white text-xs font-semibold text-stone-800"
                          >
                            <option value="active">Active</option>
                            <option value="unsubscribed">Unsubscribed</option>
                          </select>
                          <button
                            onClick={() => deleteSubscriber(sub.id)}
                            className="p-1 rounded text-rose-700 hover:bg-rose-100"
                            title="Remove subscriber"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Alumnae Registrations */}
            {activeTab === 'alumnae' && (
              <div className="space-y-3">
                {alumnae.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                    No alumnae network registrations submitted yet.
                  </div>
                ) : (
                  alumnae.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#064b36]">
                            {item.name} (Class of {item.batch})
                          </h4>
                          <p className="text-xs text-stone-600">
                            <span className="font-mono">{item.email}</span>
                            {item.profession ? ` · ${item.profession}` : ''}
                            {' · '}
                            {formatTimestamp(item.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateAlumnaStatus(
                                item.id,
                                e.target.value as 'pending' | 'verified'
                              )
                            }
                            className="px-2.5 py-1 rounded border border-stone-300 bg-white text-xs font-semibold text-stone-800"
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                          </select>
                          <button
                            onClick={() => deleteAlumnaRegistration(item.id)}
                            className="p-1.5 rounded text-rose-700 hover:bg-rose-100"
                            title="Delete registration"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {item.message && (
                        <p className="text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200">
                          {item.message}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
