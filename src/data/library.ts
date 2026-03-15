export type VideoSource = "youtube" | "vimeo";

export interface Video {
  id: string;
  title: string;
  source: VideoSource;
  videoId: string; // YouTube video ID or Vimeo video ID
  description?: string;
  date?: string; // e.g. "2024-05"
  location?: string; // specific city/region within the country
  thumbnail?: string; // optional override; auto-generated if omitted
}

export interface Country {
  slug: string; // URL-safe identifier, e.g. "japan"
  name: string;
  coverImage: string; // path under /public or a remote URL
  description?: string;
  videos: Video[];
}

// ─────────────────────────────────────────────
// ADD YOUR COUNTRIES AND VIDEOS HERE
// ─────────────────────────────────────────────
export const library: Country[] = [
  {
    slug: "prague-budapest",
    name: "Prague × Budapest",
    // Uses your own video thumbnail as the cover
    coverImage: "https://img.youtube.com/vi/0dQVq9pkR38/maxresdefault.jpg",
    description: "Two of Central Europe's most cinematic capitals — gothic spires, river bridges, and old-world grandeur.",
    videos: [
      {
        id: "prague-budapest-1",
        title: "Prague × Budapest",
        source: "youtube",
        videoId: "0dQVq9pkR38",
        location: "Prague & Budapest",
        description: "A cinematic journey through the historic hearts of Prague and Budapest.",
      },
    ],
  },
  {
    slug: "taiwan",
    name: "Taiwan",
    coverImage: "https://img.youtube.com/vi/C_coChHDBX8/maxresdefault.jpg",
    description: "Mountain temples, neon night markets, and lush green valleys across the island.",
    videos: [
      {
        id: "taiwan-1",
        title: "Taiwan",
        source: "youtube",
        videoId: "C_coChHDBX8",
        location: "Taiwan",
        description: "Exploring the dramatic landscapes and vibrant culture of Taiwan.",
      },
    ],
  },
  {
    slug: "bali",
    name: "Bali",
    coverImage: "https://img.youtube.com/vi/2E0Y2KQ23E0/maxresdefault.jpg",
    description: "Terraced rice fields, ocean cliffs, and the spiritual energy of the Island of the Gods.",
    videos: [
      {
        id: "bali-1",
        title: "Bali",
        source: "youtube",
        videoId: "2E0Y2KQ23E0",
        location: "Bali, Indonesia",
        description: "A cinematic look at Bali's iconic landscapes and hidden corners.",
      },
    ],
  },
  {
    slug: "portugal",
    name: "Portugal",
    coverImage: "https://img.youtube.com/vi/Ukb-XOQVyD8/maxresdefault.jpg",
    description: "Atlantic coastlines, golden hillside villages, and the warm light of Lisbon.",
    videos: [
      {
        id: "portugal-1",
        title: "Portugal",
        source: "youtube",
        videoId: "Ukb-XOQVyD8",
        location: "Portugal",
        description: "From the rugged Algarve cliffs to the terracotta rooftops of Lisbon.",
      },
    ],
  },
  {
    slug: "thailand",
    name: "Thailand",
    coverImage: "https://img.youtube.com/vi/iz8nY-L_bLA/maxresdefault.jpg",
    description: "Ancient temple spires, emerald island waters, and the golden haze of Bangkok.",
    videos: [
      {
        id: "thailand-1",
        title: "Thailand",
        source: "youtube",
        videoId: "iz8nY-L_bLA",
        location: "Thailand",
        description: "Soaring over Thailand's iconic landscapes from north to south.",
      },
    ],
  },
  {
    slug: "japan-korea",
    name: "Japan × Korea",
    coverImage: "https://img.youtube.com/vi/8A3cYN-wM7w/maxresdefault.jpg",
    description: "Cherry blossoms and neon streets — two countries, one unforgettable journey through East Asia.",
    videos: [
      {
        id: "japan-korea-1",
        title: "Japan × Korea",
        source: "youtube",
        videoId: "8A3cYN-wM7w",
        location: "Japan & Korea",
        description: "A dual-country film spanning the ancient and the ultra-modern across East Asia.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
export function getCountry(slug: string): Country | undefined {
  return library.find((c) => c.slug === slug);
}

export function getThumbnail(video: Video): string {
  if (video.thumbnail) return video.thumbnail;
  if (video.source === "youtube") {
    return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
  }
  // Vimeo thumbnails require an API call; return a placeholder
  return `https://vumbnail.com/${video.videoId}.jpg`;
}

export function getEmbedUrl(video: Video, autoplay = true): string {
  if (video.source === "youtube") {
    return `https://www.youtube.com/embed/${video.videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`;
  }
  return `https://player.vimeo.com/video/${video.videoId}?autoplay=${autoplay ? 1 : 0}&title=0&byline=0&portrait=0`;
}
