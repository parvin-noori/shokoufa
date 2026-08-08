export default function Loading() {
  return (
    <div className="size-full flex items-center justify-center">
      {/* <Image src="/images/BrandLogo.png" alt="لوگو" width={205} height={132} /> */}
      <svg
        className="fill-rose-500 lg:size-[90px] size-[60px]"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4" cy="12" r="1.5">
          <animate
            attributeName="r"
            dur="0.75s"
            values="1.5;3;1.5"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="12" cy="12" r="3">
          <animate
            attributeName="r"
            dur="0.75s"
            values="3;1.5;3"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="20" cy="12" r="1.5">
          <animate
            attributeName="r"
            dur="0.75s"
            values="1.5;3;1.5"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
