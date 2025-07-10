"use client";

import { useEffect, useState } from "react";

enum BREAKPOINT {
  DESKTOP_LG = 1600,
  DESKTOP = 1440,
  IPAD_PRO = 1366,
  IPAD = 1023,
  PHONE = 767,
  PHONE_SM = 540,
}

export const useBreakpoint = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window?.innerWidth);
      const handleResize = () => {
        setWidth(window?.innerWidth);
      };

      window?.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return {
    // DESKTOP-FIRST approach (max-width) - true when screen is SMALLER than or equal to breakpoint
    isPhoneSm: width <= BREAKPOINT.PHONE_SM, // <= 540px
    isPhone: width <= BREAKPOINT.PHONE, // <= 767px
    isIpad: width <= BREAKPOINT.IPAD, // <= 1023px
    isIpadPro: width <= BREAKPOINT.IPAD_PRO, // <= 1366px
    isDesktop: width <= BREAKPOINT.DESKTOP, // <= 1440px
    isDesktopLg: width <= BREAKPOINT.DESKTOP_LG, // <= 1600px

    // MOBILE-FIRST approach (min-width) - true when screen is LARGER than or equal to breakpoint
    isPhoneSmUp: width >= BREAKPOINT.PHONE_SM, // >= 540px
    isPhoneUp: width >= BREAKPOINT.PHONE, // >= 767px
    isIpadUp: width >= BREAKPOINT.IPAD, // >= 1023px
    isIpadProUp: width >= BREAKPOINT.IPAD_PRO, // >= 1366px
    isDesktopUp: width >= BREAKPOINT.DESKTOP, // >= 1440px
    isDesktopLgUp: width >= BREAKPOINT.DESKTOP_LG, // >= 1600px

    // UTILITY helpers
    isMobile: width <= BREAKPOINT.PHONE, // Mobile devices
    isTablet: width > BREAKPOINT.PHONE && width <= BREAKPOINT.IPAD, // Tablet range
    isDesktopRange: width > BREAKPOINT.IPAD, // Desktop range

    width,
    breakpoint: BREAKPOINT,
  };
};
