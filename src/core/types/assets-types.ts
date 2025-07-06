export type SVGComponent = ((_props: astroHTML.JSX.SVGAttributes) => unknown) &
  ImageMetadata;

export interface ExternalImage {
  src: string;
  alt: string;
}

export interface InternalImage {
  metadata: ImageMetadata;
  alt: string;
}
