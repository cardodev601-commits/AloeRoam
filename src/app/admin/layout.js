// export const dynamic = "force-dynamic";
export const instant = false;

export const metadata = {
  title: "Administration",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminRootLayout({ children }) {
  return children;
}
