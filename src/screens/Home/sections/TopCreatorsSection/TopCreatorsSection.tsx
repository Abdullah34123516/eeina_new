import { ChevronDownIcon, SearchIcon, Menu, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { LanguageSwitcher } from "../../../../components/LanguageSwitcher";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const TopCreatorsSection = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { t, isRTL, language } = useLanguage();

  // Get current path without language prefix
  const getCurrentPath = () => {
    const path = window.location.pathname;
    return path.startsWith('/ar') ? path.substring(3) || '/' : path;
  };

  // Generate path with language prefix
  const getLocalizedPath = (path: string) => {
    return language === 'ar' ? `/ar${path === '/' ? '' : path}` : path;
  };

  const navItems = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.explore, path: "/explore" },
    { name: t.nav.saved, path: "/saved" },
    { name: t.nav.planner, path: "/planner" },
    { name: t.nav.lists, path: "/lists" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Navigation Container - LTR: order-1, RTL: order-3 (Right) */}
        <div className={`flex items-center gap-4 sm:gap-8 ${isRTL ? 'order-3' : 'order-1'}`}>
          {/* FIT IT: Added order-last for RTL to move it to the far right */}
          <div className={`bg-[#22ae4b] text-white font-bold text-lg sm:text-xl px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg ${isRTL ? 'order-last' : ''}`}>
            EEINA
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* FIT IT: Added order-first for RTL to keep it left of the logo */}
          <NavigationMenu className={`hidden lg:block ${isRTL ? 'order-first' : ''}`}>
            <NavigationMenuList className="flex gap-4 xl:gap-8">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link
                    className={`font-bold text-sm xl:text-base hover:text-[#1c9a40] transition-colors ${
                      getCurrentPath() === item.path
                        ? "text-[#22ae4b]"
                        : "text-gray-700 hover:text-[#22ae4b]"
                    }`}
                    to={getLocalizedPath(item.path)}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search Bar - Always in the center (order-2) */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 lg:mx-8 order-2">
          <div className="bg-gray-100 rounded-xl flex items-center px-3 py-2 sm:px-4 sm:py-3">
            <SearchIcon className={`w-4 h-4 text-gray-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            <Input
              className={`border-0 bg-transparent shadow-none h-auto font-normal text-gray-700 text-xs sm:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}
              placeholder={t.nav.search_placeholder}
            />
          </div>
        </div>

        {/* Language Switcher and Profile Container - LTR: order-3, RTL: order-1 (Left) */}
        <div className={`flex items-center gap-2 sm:gap-4 ${isRTL ? 'order-1' : 'order-3'}`}>
          {/* FIT IT: Added order-last for RTL to move it to the right of the profile */}
          <div className={`hidden md:block ${isRTL ? 'order-last' : ''}`}>
            <LanguageSwitcher />
          </div>
          
          {/* FIT IT: Added order-first for RTL to move it to the far left */}
          <Link to={getLocalizedPath("/profile")} className={isRTL ? 'order-first' : ''}>
            <div className="flex items-center gap-2 sm:gap-3 bg-[#22ae4b] hover:bg-[#1c9a40] text-white rounded-full px-3 py-1.5 sm:px-6 sm:py-2 cursor-pointer transition-colors">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop"
                alt="Adam Ahmed"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
              />
              <span className="font-semibold text-xs sm:text-sm hidden sm:inline">Adam Ahmed</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay (No changes needed here) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-40">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Navigation */}
            <nav className="space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={getLocalizedPath(item.path)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg font-medium transition-colors ${
                    getCurrentPath() === item.path
                      ? "text-[#22ae4b] bg-green-50"
                      : "text-gray-700 hover:text-[#22ae4b] hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Search */}
            <div className="pt-3 border-t border-gray-100">
              <div className="bg-gray-100 rounded-xl flex items-center px-3 py-3">
                <SearchIcon className={`w-4 h-4 text-gray-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <input
                  className={`border-0 bg-transparent shadow-none h-auto font-normal text-gray-700 text-sm focus:outline-none placeholder:text-gray-500 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={t.nav.search_placeholder}
                />
              </div>
            </div>

            {/* Mobile Language Switcher & Profile */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <LanguageSwitcher />

              <Link to={getLocalizedPath("/profile")} onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 bg-[#22ae4b] hover:bg-[#1c9a40] text-white rounded-full px-4 py-2 cursor-pointer transition-colors">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop"
                    alt="Adam Ahmed"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-semibold text-sm">Adam Ahmed</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};