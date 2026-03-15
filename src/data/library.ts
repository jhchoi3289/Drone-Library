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
    slug: "norway",
    name: "Norway",
    coverImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    description: "Chasing the Northern Lights through fjords and mountain passes.",
    videos: [
      {
        id: "norway-1",
        title: "Geirangerfjord at Sunrise",
        source: "youtube",
        videoId: "dQw4w9WgXcQ", // replace with your real YouTube video ID
        location: "Geiranger",
        date: "2024-06",
        description: "Early morning mist rising over the iconic fjord.",
      },
      {
        id: "norway-2",
        title: "Lofoten Islands",
        source: "vimeo",
        videoId: "76979871", // replace with your real Vimeo video ID
        location: "Lofoten",
        date: "2023-08",
        description: "Dramatic peaks and fishing villages of the Arctic archipelago.",
      },
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    coverImage: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
    description: "Cherry blossoms, ancient temples, and volcanic peaks.",
    videos: [
      {
        id: "japan-1",
        title: "Mount Fuji Aerial",
        source: "youtube",
        videoId: "dQw4w9WgXcQ", // replace with your real YouTube video ID
        location: "Fujikawaguchiko",
        date: "2024-04",
        description: "A slow orbit around Japan's iconic peak during golden hour.",
      },
      {
        id: "japan-2",
        title: "Kyoto Rice Fields",
        source: "youtube",
        videoId: "dQw4w9WgXcQ",
        location: "Kyoto",
        date: "2024-04",
        description: "Terraced paddies glistening after the spring rains.",
      },
    ],
  },
  {
    slug: "iceland",
    name: "Iceland",
    coverImage: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80",
    description: "A road trip through glaciers, geysers, and black sand beaches.",
    videos: [
      {
        id: "iceland-1",
        title: "Skógafoss Waterfall",
        source: "vimeo",
        videoId: "76979871",
        location: "South Iceland",
        date: "2023-07",
        description: "Flying through the spray of Iceland's most dramatic waterfall.",
      },
    ],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    coverImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
    description: "Rolling green hills, wild coastlines, and fiords that take your breath away.",
    videos: [
      {
        id: "nz-1",
        title: "Milford Sound",
        source: "youtube",
        videoId: "dQw4w9WgXcQ",
        location: "Fiordland",
        date: "2024-01",
        description: "Low cloud drifting through the world's most photographed fiord.",
      },
    ],
  },
  {
    slug: "morocco",
    name: "Morocco",
    coverImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
    description: "Wandering through ancient medinas, Sahara dunes, and Atlas Mountain villages.",
    videos: [
      {
        id: "morocco-1",
        title: "Sahara at Dawn",
        source: "youtube",
        videoId: "dQw4w9WgXcQ",
        location: "Merzouga",
        date: "2023-11",
        description: "Sand dunes casting long shadows at first light.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    coverImage: "https://images.unsplash.com/photo-1507992781348-310259076fe0?w=800&q=80",
    description: "From the turquoise lakes of the Rockies to the wilds of the north.",
    videos: [
      {
        id: "canada-1",
        title: "Banff National Park",
        source: "youtube",
        videoId: "dQw4w9WgXcQ",
        location: "Alberta",
        date: "2024-09",
        description: "Turquoise glacial lakes surrounded by snow-capped peaks.",
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

export function getEmbedUrl(video: Video): string {
  if (video.source === "youtube") {
    return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`;
  }
  return `https://player.vimeo.com/video/${video.videoId}?autoplay=1&title=0&byline=0&portrait=0`;
}
