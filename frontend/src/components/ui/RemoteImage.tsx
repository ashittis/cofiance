/* eslint-disable @next/next/no-img-element */
// Plain <img> for local, content-matched photos served from /public/images
// (routed through lib/images.ts). object-cover keeps every slot cohesive.
export function RemoteImage({
  src,
  alt,
  className = "",
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div className={`overflow-hidden ${rounded} bg-mint/30 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}
