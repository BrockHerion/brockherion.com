interface AffiliateLinkProps {
  children: React.ReactNode;
  imageSrc: string;
  irSrc: string;
}

export function AffiliateLink({
  children,
  imageSrc,
  irSrc,
}: AffiliateLinkProps) {
  return (
    <div className="flex justify-center mt-4 mb-8">
      <div className="max-w-md w-full">
        <div className="flex text-gray-800 dark:text-slate-100 justify-between shadow dark:shadow-none bg-slate-100 dark:bg-slate-600 rounded overflow-hidden">
          <div className="px-4 mt-2">{children}</div>
          <img src={imageSrc} />
        </div>
        <img
          src={irSrc}
          width="1"
          height="1"
          alt=""
          style={{ border: "none !important", margin: "0px !important" }}
        />
      </div>
    </div>
  );
}
