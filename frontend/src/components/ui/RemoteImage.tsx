/* eslint-disable @next/next/no-img-element */
// Plain <img> for temporary remote placeholders (loremflickr). Swappable later
// for next/image once real assets land. grayscale-on-idle keeps the look cohesive.
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
