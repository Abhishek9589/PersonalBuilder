export default function Logo({
  size = "md",
  showText = true,
  className = "",
}) {
  const sizes = {
    sm: { icon: "w-5 h-5 md:w-6 md:h-6", text: "text-sm md:text-lg" },
    md: { icon: "w-6 h-6 md:w-8 md:h-8", text: "text-base md:text-xl" },
    lg: { icon: "w-8 h-8 md:w-12 md:h-12", text: "text-xl md:text-3xl" },
  };

  return (
    <div className={`flex items-center gap-1 md:gap-2 ${className}`}>
      <div
        className={`${sizes[size].icon} bg-black rounded-md md:rounded-lg flex items-center justify-center transition-transform hover:scale-105 flex-shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          className="w-2/3 h-2/3"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      </div>
      {showText && (
        <span className={`font-roboto font-bold text-black ${sizes[size].text} leading-tight`}>
          PersonalBuilder
        </span>
      )}
    </div>
  );
}
