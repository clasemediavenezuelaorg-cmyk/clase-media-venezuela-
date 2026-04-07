const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export async function uploadImageToImgBB(file: File): Promise<string> {
  if (!IMGBB_API_KEY) {
    throw new Error('ImgBB API Key is missing. Check your environment variables.');
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to ImgBB');
    }

    const result = await response.json();
    return result.data.url;
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    throw error;
  }
}

export function getYoutubeThumbnail(url: string): string | null {
  const videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  if (videoId && videoId[1]) {
    return `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`;
  }
  return null;
}
