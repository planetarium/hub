import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  tags: string[];
}

export default function RootLayout({ children, tags }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-between px-32 py-4">
      <Navbar tags={tags} />
      {children}
    </div>
  );
}
