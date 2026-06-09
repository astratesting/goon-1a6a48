import {
  Sparkles,
  LayoutTemplate,
  Pencil,
  Palette,
  Globe,
  BarChart3,
  ArrowRight,
  Check,
  Plus,
  ChevronDown,
  Loader2,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  "layout-template": LayoutTemplate,
  pencil: Pencil,
  palette: Palette,
  globe: Globe,
  "bar-chart-3": BarChart3,
  "arrow-right": ArrowRight,
  check: Check,
  plus: Plus,
  "chevron-down": ChevronDown,
  "loader-2": Loader2,
  menu: Menu,
  x: X,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({ name, size = 20, className = "", strokeWidth = 1.5 }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
}
