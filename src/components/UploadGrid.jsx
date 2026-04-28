import { useRef } from 'react';
import { MAX_FILES } from '../constants/config';
import './UploadGrid.css';

export default function UploadGrid({ previews, files, onAddFiles, onRemoveFile }) {
    const inputRef = useRef(null);
    const canAddMore = files.length < MAX_FILES;
    const isSingleRow = files.length < 3; // ≤2 images + add tile fits in one row

    const handleFileChange = (e) => {
        if (e.target.files?.length) {
            onAddFiles(e.target.files);
            e.target.value = '';
        }
    };

    return (
        <div className="upload-section">
            {/* ── Section label ─────────────────────────────────────── */}
            <h2 className="upload-section__label">Upload image</h2>

            {/* ── File picker + grid ────────────────────────────────── */}
            <div className="upload-zone">
                {/* Hidden file input */}
                <input
                    ref={inputRef}
                    id="icp-file-input"
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    multiple
                    className="upload-zone__input"
                    onChange={handleFileChange}
                />

                {/* ── Grid of thumbnails + add tile ────────────────────── */}
                <div className={`upload-grid ${isSingleRow ? 'upload-grid--single-row' : ''}`}>
                    {previews.map((src, i) => (
                        <div className="upload-grid__tile" key={i}>
                            <img src={src} alt={`Preview ${i + 1}`} className="upload-grid__img" />
                            <button
                                type="button"
                                className="upload-grid__remove"
                                aria-label={`Remove image ${i + 1}`}
                                onClick={() => onRemoveFile(i)}
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    {/* ── Add tile ───────────────────────────────────────── */}
                    {canAddMore && (
                        <label htmlFor="icp-file-input" className="upload-grid__tile upload-grid__add">
                            <span className="upload-grid__plus-circle">
                                <span className="upload-grid__plus-icon">+</span>
                            </span>
                        </label>
                    )}
                </div>
            </div>

            {/* ── Callout (tooltip with pointer) ────────────────────── */}
            <div className="upload-callout">
                <span className="upload-callout__pointer" />
                <div className="upload-callout__body">
                    <div className="upload-callout__inner">
                        <p className="upload-callout__title">
                            Accepted formats: JPG, JPEG, GIF, WEBP, PNG
                        </p>
                        <p className="upload-callout__sub">
                            Max 10MB each, up to {MAX_FILES} images
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
