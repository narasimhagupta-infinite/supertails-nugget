import {
    UPLOAD_API_URL,
    UPDATE_TICKET_API_URL,
    UPLOAD_TIMEOUT_MS,
    TICKET_TIMEOUT_MS,
    ERRORS,
} from '../constants/config';

/**
 * Upload a single image file to the backend.
 * @param {File} file
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export async function uploadFile(file) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);

    try {
        const body = new FormData();
        body.append('file', file);

        const res = await fetch(UPLOAD_API_URL, {
            method: 'POST',
            body,
            signal: controller.signal,
        });

        if (!res.ok) throw new Error(ERRORS.UPLOAD_FAIL);

        const data = await res.json();

        // Ensure response contains a real CDN URL (not a blob: URL)
        if (!data.url || data.url.startsWith('blob:')) {
            throw new Error(ERRORS.UPLOAD_FAIL);
        }

        return { success: true, url: data.url };
    } catch (err) {
        if (err.name === 'AbortError') {
            return { success: false, error: ERRORS.TIMEOUT };
        }
        return { success: false, error: err.message || ERRORS.UPLOAD_FAIL };
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Attach uploaded image URLs to a CRM ticket.
 * @param {string} ticketId
 * @param {string[]} imageUrls
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function updateTicket(ticketId, imageUrls) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TICKET_TIMEOUT_MS);

    try {
        const res = await fetch(UPDATE_TICKET_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticket_id: ticketId, image_urls: imageUrls }),
            signal: controller.signal,
        });

        if (!res.ok) throw new Error(ERRORS.TICKET_FAIL);
        return { success: true };
    } catch (err) {
        if (err.name === 'AbortError') {
            return { success: false, error: ERRORS.TIMEOUT };
        }
        return { success: false, error: err.message || ERRORS.TICKET_FAIL };
    } finally {
        clearTimeout(timer);
    }
}
