/**
 * CENTRAL CONFIGURATION — DPS DARSHAN
 * Every brand/contact/payment/social value lives here so a future Admin CMS
 * can replace this object with an API response without touching components.
 */

export type AdSlide = {
  id: string;
  image: string | null;
  title: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  active: boolean;
  sortOrder: number;
};

export type ProgramItem = {
  id: string;
  name: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string | null;
};

export type VideoItem = {
  id: string; // YouTube video id
  title: string;
  category: string;
  date?: string;
};

export type GalleryItem = {
  id: string;
  image: string | null;
  caption: string;
};

export const siteConfig = {
  brandName: "DPS DARSHAN",
  tagline: "संतों का संग • सत्संग का प्रसंग • भक्ति का प्रसारण",
  /** Admin-uploaded logo. Place the official file at /images/dps-darshan-logo.png */
  logo: "/images/dps-darshan-logo.png",
  phone1: "9755864233",
  phone2: "9826729461",
  whatsapp: "9755864233",
  email: "",
  address: "",

  // Social — configured in ONE place only
  youtubeUrl: "https://www.youtube.com/@DPS_BHAJAN",
  youtubeChannelHandle: "@DPS_BHAJAN",
  youtubePlaylistUrl: "https://www.youtube.com/@DPS_BHAJAN/videos",
  youtubeLiveEmbedUrl: "https://www.youtube.com/embed/live_stream?channel=&autoplay=0",
  facebookUrl: "https://www.facebook.com/dpsdarshan",
  facebookLiveEmbedUrl: "",
  instagramUrl: "https://www.instagram.com/dpsdarshan",

  // Payment — placeholders only. Admin must enter real details.
  upiId: "UPI-ID-PENDING",
  accountName: "DPS DARSHAN",
  bankName: "—",
  accountNumber: "—",
  ifsc: "—",
  branch: "—",
  /** Admin-uploaded QR images (never generated) */
  paymentQr: null as string | null,
  donationQr: null as string | null,

  payment: {
    tokenAmount: 5000,
    advanceAmount: 20000,
    fullAmount: 50000,
  },
};

/** LIVE state — Admin controlled */
export const liveConfig = {
  isLive: false,
  platform: "youtube" as "youtube" | "facebook",
  programName: "श्रीमद्भागवत कथा",
  venue: "—",
  date: "—",
  time: "—",
};

export const advertisements: AdSlide[] = [];

export const upcomingPrograms: ProgramItem[] = [
  {
    id: "p1",
    name: "श्रीमद्भागवत कथा",
    type: "कथा",
    date: "—",
    time: "—",
    venue: "—",
    description: "सात दिवसीय श्रीमद्भागवत कथा का दिव्य आयोजन एवं लाइव प्रसारण।",
    image: null,
  },
  {
    id: "p2",
    name: "सुंदरकांड पाठ",
    type: "पाठ",
    date: "—",
    time: "—",
    venue: "—",
    description: "श्री हनुमान जी की कृपा हेतु सामूहिक सुंदरकांड पाठ एवं भजन।",
    image: null,
  },
  {
    id: "p3",
    name: "खाटूश्याम भजन संध्या",
    type: "भजन",
    date: "—",
    time: "—",
    venue: "—",
    description: "प्रसिद्ध भजन गायकों के साथ श्याम बाबा की भजन संध्या।",
    image: null,
  },
];

/** Featured videos — Admin adds real DPS DARSHAN YouTube IDs here.
 *  Thumbnails are served by YouTube (i.ytimg.com), never generated. */
export const featuredVideos: VideoItem[] = [];

export const galleryItems: GalleryItem[] = [];

export const programTypes = [
  "श्रीराम कथा",
  "श्रीमद्भागवत कथा",
  "देवी कथा",
  "नानीबाई मायरो",
  "सुंदरकांड",
  "खाटूश्याम भजन",
  "भजन संध्या",
  "जागरण",
  "सत्संग",
  "धार्मिक आयोजन",
  "अन्य",
];

export const telHref = (n: string) => `tel:+91${n}`;
export const waHref = (n: string, text = "") =>
  `https://wa.me/91${n}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
