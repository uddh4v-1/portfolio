declare module 'react-simple-maps' {
  import { ReactNode, SVGProps } from 'react';

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
  }
  export function ComposableMap(props: ComposableMapProps & { children: ReactNode }): JSX.Element;

  interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: GeoFeature[] }) => ReactNode;
  }
  export function Geographies(props: GeographiesProps): JSX.Element;

  interface GeoFeature {
    rsmKey: string;
    id: string;
    properties: Record<string, unknown>;
  }

  interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: GeoFeature;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: { default?: object; hover?: object; pressed?: object };
  }
  export function Geography(props: GeographyProps): JSX.Element;

  interface MarkerProps {
    coordinates: [number, number];
    children: ReactNode;
  }
  export function Marker(props: MarkerProps): JSX.Element;
}
