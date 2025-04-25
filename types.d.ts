import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'lucide-react' {
  export const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Zap: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Shield: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Users: React.FC<React.SVGProps<SVGSVGElement>>;
  export const BarChart: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Globe: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Search: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Mail: React.FC<React.SVGProps<SVGSVGElement>>;
  export const MapPin: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Phone: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Moon: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Sun: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Menu: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Github: React.FC<React.SVGProps<SVGSVGElement>>;
} 