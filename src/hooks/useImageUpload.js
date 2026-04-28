import { useState, useCallback } from 'react';
import {
    MAX_FILES,
    MAX_SIZE_BYTES,
    ALLOWED_TYPES,
    ALLOWED_EXTENSIONS,
    ERRORS,
} from '../constants/config';
import { uploadFile, updateTicket } from '../services/uploadService';

/**
 * Custom hook that manages the image-upload lifecycle:
 *   select → validate → preview → upload → update ticket → success
 */
export default function useImageUpload() {
    const [files, setFiles] = useState([]);      // File objects
    const [previews, setPreviews] = useState([]); // blob: URLs
    const [error, setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // ── helpers ───────────────────────────────────────────────────
    const revokePreviews = (urls) => urls.forEach(URL.revokeObjectURL);

    const validate = (incoming, existing) => {
        for (const file of incoming) {
            if (!(file instanceof File)) return ERRORS.INVALID_TYPE;
            const mimeType = (file.type || '').toLowerCase();
            const extension = (file.name?.split('.').pop() || '').toUpperCase();

            // Some mobile browsers/cameras provide empty or non-standard MIME types.
            // Accept files if either MIME type OR extension is in the allow-list.
            const isAllowedMime = ALLOWED_TYPES.includes(mimeType);
            const isAllowedExtension = ALLOWED_EXTENSIONS.includes(extension);
            if (!isAllowedMime && !isAllowedExtension) return ERRORS.INVALID_TYPE;

            if (file.size <= 0) return ERRORS.INVALID_TYPE;
            if (file.size > MAX_SIZE_BYTES) return ERRORS.OVER_SIZE;
        }
        if (existing.length + incoming.length > MAX_FILES) return ERRORS.OVER_LIMIT;
        return null;
    };

    // ── addFiles ──────────────────────────────────────────────────
    const addFiles = useCallback(
        (fileList) => {
            const incoming = Array.from(fileList);
            if (!incoming.length) return;

            const err = validate(incoming, files);
            if (err) {
                setError(err);
                return;
            }

            setError('');
            const newPreviews = incoming.map((f) => URL.createObjectURL(f));
            setFiles((prev) => [...prev, ...incoming]);
            setPreviews((prev) => [...prev, ...newPreviews]);
        },
        [files],
    );

    // ── removeFile ────────────────────────────────────────────────
    const removeFile = useCallback(
        (index) => {
            URL.revokeObjectURL(previews[index]);
            setFiles((prev) => prev.filter((_, i) => i !== index));
            setPreviews((prev) => prev.filter((_, i) => i !== index));
            setError('');
        },
        [previews],
    );

    // ── submitUpload ──────────────────────────────────────────────
    const submitUpload = useCallback(
        async (ticketId) => {
            if (!files.length) {
                setError(ERRORS.NO_FILES);
                return;
            }

            setError('');
            setIsUploading(true);

            try {
                // 1. Upload all files in parallel
                const results = await Promise.all(files.map(uploadFile));
                const failed = results.find((r) => !r.success);
                if (failed) {
                    setError(failed.error);
                    setIsUploading(false);
                    return;
                }

                const imageUrls = results.map((r) => r.url);

                // 2. Attach URLs to ticket
                const ticketResult = await updateTicket(ticketId, imageUrls);
                if (!ticketResult.success) {
                    setError(ticketResult.error);
                    setIsUploading(false);
                    return;
                }

                // 3. Cleanup blob URLs & show success
                revokePreviews(previews);
                setIsSuccess(true);
            } catch {
                setError(ERRORS.UPLOAD_FAIL);
            } finally {
                setIsUploading(false);
            }
        },
        [files, previews],
    );

    return {
        files,
        previews,
        error,
        isUploading,
        isSuccess,
        addFiles,
        removeFile,
        submitUpload,
        setError,
    };
}
