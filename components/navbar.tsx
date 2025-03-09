// components/Navbar.tsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full py-4 border-b border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 hover:text-gray-700"
        >
          Government Tracker
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/bills" className="text-gray-700 hover:text-gray-900">
                Bills
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
