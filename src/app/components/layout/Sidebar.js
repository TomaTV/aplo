import { Home, FileText, Folder, Settings } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: Folder, label: "Workspaces", href: "/workspaces" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 py-4 px-6">
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold">
          Aplo
        </Link>
      </div>
      <nav>
        {sidebarItems.map(({ icon: Icon, label, href }) => (
          <Link key={href} href={href}>
            <div className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100">
              <Icon size={20} />
              <span>{label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
