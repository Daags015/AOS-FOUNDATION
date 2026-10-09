/**
 * Formats a Nigerian local phone number to international WhatsApp format.
 * E.g., '08168779732' -> '2348168779732'
 */
export function formatWhatsAppUrl(phoneNumber: string, message: string): string {
  // Strip non-numeric characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  let internationalNumber = cleanNumber;
  if (cleanNumber.startsWith('0')) {
    internationalNumber = '234' + cleanNumber.substring(1);
  } else if (!cleanNumber.startsWith('234')) {
    internationalNumber = '234' + cleanNumber;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${internationalNumber}?text=${encodedMessage}`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Update document head metadata dynamically for technical SEO
 */
export function updatePageSEO(title: string, description: string): void {
  const fullTitle = `${title} | AOS Foundation`;
  document.title = fullTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', fullTitle);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', description);
  }
}

/**
 * Extracts standard 11-character YouTube video ID from various YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // If already just the 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

export function getYouTubeThumbnail(url: string): string {
  const id = extractYouTubeId(url);
  if (!id) return '';
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(url: string): string {
  const id = extractYouTubeId(url);
  if (!id) return '';
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
}

/**
 * Ultra low-memory image downscaler and compressor.
 * Uses progressive decoding via HTMLImageElement and ObjectURL to eliminate
 * mobile OS RAM exhaustion and screen black-outs / tab crashes.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    let blobUrl = '';
    try {
      blobUrl = URL.createObjectURL(file);
    } catch (e) {
      // Fallback to FileReader if createObjectURL fails
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    img.decoding = 'async';

    img.onload = () => {
      try {
        let width = img.naturalWidth || img.width || 1;
        let height = img.naturalHeight || img.height || 1;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });

        if (!ctx) {
          URL.revokeObjectURL(blobUrl);
          // If 2d canvas fails, read via FileReader as fallback
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
          return;
        }

        // Fill background white in case of transparent png converting to jpeg
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        URL.revokeObjectURL(blobUrl);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (err) {
        URL.revokeObjectURL(blobUrl);
        // Fallback to standard reader
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(err);
        reader.readAsDataURL(file);
      }
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(blobUrl);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(err);
      reader.readAsDataURL(file);
    };

    img.src = blobUrl;
  });
}



