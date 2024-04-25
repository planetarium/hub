import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  tags: string[];
}

export default function RootLayout({ children, tags }: LayoutProps) {
  return (
    <div
      data-theme="winter"
      className="flex flex-col items-center justify-between"
    >
      <Navbar tags={tags} />
      <div className="max-w-screen-xl mt-8 px-10">{children}</div>
    </div>
  );
}
