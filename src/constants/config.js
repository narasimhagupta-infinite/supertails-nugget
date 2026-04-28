// ── API Endpoints ──────────────────────────────────────────────
export const UPLOAD_API_URL =
    'https://supertails-backend.el.r.appspot.com/upload';

export const UPDATE_TICKET_API_URL =
    'https://supertails-backend.el.r.appspot.com/order/crm/update-ticket';

// ── Validation ─────────────────────────────────────────────────
export const MAX_FILES = 5;
export const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
];
export const ALLOWED_EXTENSIONS = ['JPG', 'JPEG', 'PNG', 'GIF', 'WEBP'];

// ── Timeouts ───────────────────────────────────────────────────
export const UPLOAD_TIMEOUT_MS = 120_000; // 120 s
export const TICKET_TIMEOUT_MS = 30_000; //  30 s

// ── Session Storage ────────────────────────────────────────────
export const SESSION_KEY = 'icp_attachments_payload';

// ── Error Messages ─────────────────────────────────────────────
export const ERRORS = {
    NO_FILES: 'Please upload an image to continue',
    OVER_LIMIT: `You can upload up to ${MAX_FILES} images.`,
    INVALID_TYPE: 'Invalid image format. Please upload a valid image',
    OVER_SIZE: 'Image exceeds 10MB. Upload a smaller image',
    NO_TICKET:
        'This link is missing a ticket reference. Please open the page from your return email or app link.',
    UPLOAD_FAIL: 'Upload failed. Please try again.',
    TICKET_FAIL: 'Could not save images to your ticket. Please try again.',
    TIMEOUT:
        'Request timed out. Please check your connection and try again.',
};

// ── Assets (CDN) ───────────────────────────────────────────────
export const LOGO_URL =
    'https://cdn.shopify.com/s/files/1/0565/8021/0861/files/logo_f1d3794f-311b-4c54-90d7-98e72a93e105.png?v=1777287037';

export const DESKTOP_HERO_URL =
    'https://cdn.shopify.com/s/files/1/0565/8021/0861/files/desktop-image.png?v=1777290212';

export const MOBILE_HERO_URL =
    'https://cdn.shopify.com/s/files/1/0565/8021/0861/files/mobile-image_861826d0-ef49-4cbe-aab6-0a243d86c457.png?v=1777290449';

export const SUCCESS_GIF_URL =
    'https://cdn.shopify.com/s/files/1/0565/8021/0861/files/success_b4626baf-dab1-4063-91ed-f317fb298f95.gif?v=1777299731';
