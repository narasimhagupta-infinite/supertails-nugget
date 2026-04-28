import { useMemo } from 'react';
import Header from './components/Header';
import UploadGrid from './components/UploadGrid';
import ErrorBanner from './components/ErrorBanner';
import SuccessScreen from './components/SuccessScreen';
import useImageUpload from './hooks/useImageUpload';
import { ERRORS, DESKTOP_HERO_URL, MOBILE_HERO_URL } from './constants/config';
import './App.css';

function App() {
  const ticketId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('ticketid') || '';
  }, []);

  const {
    files,
    previews,
    error,
    isUploading,
    isSuccess,
    addFiles,
    removeFile,
    submitUpload,
    setError,
  } = useImageUpload();

  const noTicket = !ticketId;
  const canSubmit = files.length > 0 && !isUploading && !noTicket;

  const handleContinue = () => {
    if (noTicket) {
      setError(ERRORS.NO_TICKET);
      return;
    }
    submitUpload(ticketId);
  };

  return (
    <div className={`icp-page ${isSuccess ? 'icp-page--success' : ''}`}>
      <Header />

      {/* ── Mobile hero image (hidden on desktop) ───────────── */}
      <div className="icp-mweb-hero">
        <img
          className="icp-hero-img"
          src={MOBILE_HERO_URL}
          alt="Decorative illustration for upload help"
          width="600"
          height="400"
          loading="lazy"
        />
      </div>

      <main className={`icp-main ${isSuccess ? 'icp-main--success' : ''}`}>
        {/* ── Left card ──────────────────────────────────────── */}
        <section className="icp-card">
          {isSuccess ? (
            <SuccessScreen />
          ) : (
            <div className="icp-card__content">
              <div className="icp-card__header">
                <h1 className="icp-card__title">Upload images below</h1>
                <p className="icp-card__subtitle">
                  Clear images help our team assist you faster
                </p>
              </div>

              {noTicket && (
                <ErrorBanner message={ERRORS.NO_TICKET} />
              )}

              {!noTicket && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                      <UploadGrid
                        files={files}
                        previews={previews}
                        onAddFiles={addFiles}
                        onRemoveFile={removeFile}
                      />
                    </div>

                    <ErrorBanner message={error} />

                    <button
                      type="button"
                      className={`icp-btn icp-btn--primary ${canSubmit ? '' : 'icp-btn--disabled'}`}
                      disabled={!canSubmit}
                      onClick={handleContinue}
                    >
                      {isUploading ? (
                        <span className="icp-btn__spinner" aria-label="Uploading…" />
                      ) : (
                        'Continue'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* ── Right hero (desktop only) ──────────────────────── */}
        <aside className="icp-aside" aria-hidden="true">
          <img
            className="icp-hero-img"
            src={DESKTOP_HERO_URL}
            alt="Decorative illustration for upload help"
            width="800"
            height="600"
            loading="lazy"
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
