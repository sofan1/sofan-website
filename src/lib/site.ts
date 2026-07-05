// SOFAN site-wide configuration — single source of truth for business data.
// Mirrors a WordPress theme's "site settings" so content is consistent everywhere.

export const site = {
  brand: "SOFAN",
  brandFull: "MN SOFAN",
  tagline: "Business Development Services",
  description:
    "Premium tech development and digital marketing across the UAE. Guaranteed fast delivery. Affordable websites, custom web apps, and SEO campaigns built to attract both local Arab and international clients.",

  // Contact
  phoneDisplay: "+971 55 207 9989",
  phoneRaw: "+971552079989",
  whatsappLink: "https://wa.me/971552079989",
  callLink: "tel:+971552079989",
  email: "mnsofan1@gmail.com",
  emailLink: "mailto:mnsofan1@gmail.com",

  // Location
  addressShort: "Hor Al Anz, Deira, Dubai, UAE",
  addressLine1: "Hor Al Anz",
  addressLine2: "Deira, Dubai",
  addressCountry: "United Arab Emirates",
  // Google Maps embed for Hor Al Anz, Deira, Dubai
  mapsEmbed:
    "https://www.google.com/maps?q=Hor+Al+Anz+Deira+Dubai+UAE&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Hor+Al+Anz+Deira+Dubai",

  // Hours
  officeHours: "Mon–Fri: 9:00 AM – 6:00 PM (GST)",
  weekendHours: "Sat & Sun: Closed",
  liveChatHours: "Live chat support: 24/7",

  // Emirates served
  emirates: [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
  ],
} as const;

export type Service = {
  icon: string; // lucide icon name
  title: string;
  description: string;
  tags: string[];
};

export const services: Service[] = [
  {
    icon: "Globe",
    title: "Website Development",
    description:
      "Affordable, responsive websites that convert visitors into customers. Arabic & English support.",
    tags: ["Landing Pages", "Corporate", "E-commerce"],
  },
  {
    icon: "Code2",
    title: "Custom Web Apps",
    description:
      "Tailored web applications for your unique business needs — from CRM systems to booking platforms.",
    tags: ["SaaS", "Portals", "APIs"],
  },
  {
    icon: "Search",
    title: "SEO Campaigns",
    description:
      "Rank higher on Google with SEO built for the UAE market. Bilingual optimization for maximum reach.",
    tags: ["Local SEO", "Arabic SEO", "Technical"],
  },
  {
    icon: "Megaphone",
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across Google Ads, social media, and email that deliver measurable ROI fast.",
    tags: ["Google Ads", "Social Media", "Email"],
  },
  {
    icon: "Smartphone",
    title: "Mobile-First Design",
    description:
      "With 80%+ UAE users on mobile, we build everything mobile-first for maximum engagement.",
    tags: ["Responsive", "PWA", "UI/UX"],
  },
  {
    icon: "BarChart3",
    title: "Analytics & Reporting",
    description:
      "Clear dashboards you actually understand. Track every metric that matters for your growth.",
    tags: ["Analytics", "Reports", "KPIs"],
  },
];

export type WhyFeature = {
  icon: string;
  title: string;
  description: string;
};

export const whyFeatures: WhyFeature[] = [
  {
    icon: "Zap",
    title: "Guaranteed Fast Delivery",
    description: "Most projects delivered in 48 hours to 2 weeks. No endless waiting.",
  },
  {
    icon: "Wallet",
    title: "Flexible Budget Options",
    description: "Solutions that match your budget — from startups to enterprise-level projects.",
  },
  {
    icon: "Languages",
    title: "Bilingual Expertise",
    description: "Arabic & English content that resonates with both local and international audiences.",
  },
  {
    icon: "ShieldCheck",
    title: "UAE Regulatory Compliance",
    description: "Every project fully complies with UAE regulations and business standards.",
  },
];

export type Stat = {
  icon: string;
  value: string;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { icon: "Zap", value: "48", suffix: "h", label: "Avg Delivery" },
  { icon: "ShieldCheck", value: "100", suffix: "%", label: "UAE Compliant" },
  { icon: "Users", value: "500", suffix: "+", label: "Clients Served" },
  { icon: "TrendingUp", value: "3", suffix: "x", label: "Avg ROI Growth" },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "Tell us your vision via our AI agent. We'll assess your needs instantly.",
  },
  {
    number: "02",
    title: "Custom Proposal",
    description:
      "Receive a detailed plan with timeline, deliverables, and flexible pricing.",
  },
  {
    number: "03",
    title: "Build & Review",
    description:
      "We develop your project with regular check-ins so you stay in control.",
  },
  {
    number: "04",
    title: "Launch & Grow",
    description:
      "Go live with full setup and ongoing support to scale your business.",
  },
];

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#locations", label: "Locations" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export const serviceOptions = [
  "Website Development",
  "Custom Web App",
  "SEO Campaign",
  "Digital Marketing",
  "Other",
];

export const budgetOptions = ["AED 5K–15K", "AED 15K–50K", "AED 50K+", "Flexible"];
