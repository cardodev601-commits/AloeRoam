import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://aloeroam.app"),
  title: {
    default: "AloeRoam | Discover Local Experiences",
    template: "%s | AloeRoam",
  },
  description:
    "Discover local events, promotions and services with AloeRoam.",
  applicationName: "AloeRoam",
  keywords: [
    "AloeRoam",
    "local events",
    "local promotions",
    "local services",
    "South Africa",
  ],
  authors: [{ name: "AloeRoam" }],
  creator: "AloeRoam",
  publisher: "AloeRoam",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://aloeroam.app",
    siteName: "AloeRoam",
    title: "AloeRoam | Discover Local Experiences",
    description:
      "Discover local events, promotions and services with AloeRoam.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AloeRoam | Discover Local Experiences",
    description:
      "Discover local events, promotions and services with AloeRoam.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#174D3A",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-ZA">
      <body>{children}</body>
    </html>
  );
}
