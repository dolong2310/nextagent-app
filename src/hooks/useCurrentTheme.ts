import { useTheme } from "next-themes";

const useCurrentTheme = () => {
  const { systemTheme, theme } = useTheme();

  if (theme === "dark" || theme === "light") {
    return theme;
  }

  return systemTheme;
};

export default useCurrentTheme;
