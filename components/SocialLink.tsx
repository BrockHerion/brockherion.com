import { IconType } from "react-icons";

interface SocialLinkProps {
  url: string;
  icon: React.ReactElement<IconType>;
}

export default function SocialLink({ url, icon }: SocialLinkProps) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {icon}
    </a>
  );
}
