import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

export const SCHOOL_LOGO_PATH = "/images/gabo-logo.jpg";
export const SCHOOL_NAME = "Institución Educativa GABO";

const sizeConfig = {
  sm: {
    shield: "h-9 w-9",
    title: "text-[10px]",
    subtitle: "text-xs",
  },
  md: {
    shield: "h-11 w-11",
    title: "text-[11px]",
    subtitle: "text-sm",
  },
  lg: {
    shield: "h-14 w-14",
    title: "text-xs",
    subtitle: "text-base",
  },
} as const;

export type SchoolLogoProps = {
  /** When true, navigates to /dashboard; otherwise to /. */
  isAuthenticated?: boolean;
  /** Override the default navigation target. */
  href?: string;
  size?: keyof typeof sizeConfig;
  /** Show institution name on sm+ breakpoints. */
  showText?: boolean;
  /** When false, renders as a static brand mark without navigation. */
  interactive?: boolean;
  /** Text color tone for use on dark backgrounds. */
  textTone?: "default" | "light";
  className?: string;
  linkClassName?: string;
  priority?: boolean;
};

export function SchoolLogo({
  isAuthenticated = false,
  href,
  size = "md",
  showText = true,
  interactive = true,
  textTone = "default",
  className,
  linkClassName,
  priority = false,
}: SchoolLogoProps) {
  const destination = href ?? (isAuthenticated ? "/dashboard" : "/");
  const config = sizeConfig[size];

  const content = (
    <>
      <div
        className={cn(
          "relative shrink-0 rounded-lg bg-white shadow-xs ring-1 ring-border/25",
          config.shield
        )}
      >
        <Image
          src={SCHOOL_LOGO_PATH}
          alt="Escudo Institución Educativa GABO"
          fill
          priority={priority}
          className="object-contain p-1"
          sizes="48px"
        />
      </div>

      {showText ? (
        <div className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span
            className={cn(
              "truncate font-semibold uppercase tracking-wide",
              textTone === "light" ? "text-white/70" : "text-muted-foreground",
              config.title
            )}
          >
            Institución Educativa
          </span>
          <span
            className={cn(
              "truncate font-black tracking-tight",
              textTone === "light" ? "text-white" : "text-foreground",
              config.subtitle
            )}
          >
            GABO
          </span>
        </div>
      ) : null}
    </>
  );

  const wrapperClassName = cn(
    "inline-flex min-h-11 min-w-11 items-center gap-2.5 rounded-xl",
    interactive &&
    "transition-opacity hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    linkClassName,
    className
  );

  if (!interactive) {
    return <div className={wrapperClassName}>{content}</div>;
  }

  return (
    <Link href={destination} aria-label={SCHOOL_NAME} className={wrapperClassName}>
      {content}
    </Link>
  );
}
