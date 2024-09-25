import { ITheme } from "../../models";
import styles from "./Header.module.css";

const headerStyles: Record<ITheme, Record<string, string>> = {
  light: {
    header: styles.header,
    headerNav: styles.header_nav,
    active: styles.active,
    inActive: styles.inactive,
  },
  dark: {
    header: styles.header_dark,
    headerNav: styles.header_nav_dark,
    active: styles.active_dark,
    inActive: styles.inactive_dark,
  },
} as const;

export { headerStyles };
