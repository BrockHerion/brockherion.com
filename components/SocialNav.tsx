import {
  FiFacebook,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import SocialLink from "./SocialLink";

interface SocialItemProps {
  children: React.ReactNode;
}

export function SocialItem({ children }: SocialItemProps) {
  return <li className="mr-3">{children}</li>;
}

export default function SocialNav() {
  return (
    <ul className="flex">
      <SocialItem>
        <SocialLink
          url="https://twitter.com/BrockHerion"
          icon={
            <FiTwitter
              className="dark:text-slate-100 text-gray-800"
              size="1.3em"
            />
          }
        />
      </SocialItem>
      <SocialItem>
        <SocialLink
          url="https://github.com/brockherion"
          icon={
            <FiGithub
              className="dark:text-slate-100 text-gray-800"
              size="1.3em"
            />
          }
        />
      </SocialItem>
      <SocialItem>
        <SocialLink
          url="https://www.linkedin.com/in/brock-j-herion-34279a176/"
          icon={
            <FiLinkedin
              className="dark:text-slate-100 text-gray-800"
              size="1.3em"
            />
          }
        />
      </SocialItem>
      <SocialItem>
        <SocialLink
          url="https://www.instagram.com/brock_herion/"
          icon={
            <FiInstagram
              className="dark:text-slate-100 text-gray-800"
              size="1.3em"
            />
          }
        />
      </SocialItem>
      <SocialItem>
        <SocialLink
          url="https://www.facebook.com/Brock-Herion-197864878943988"
          icon={
            <FiFacebook
              className="dark:text-slate-100 text-gray-800"
              size="1.3em"
            />
          }
        />
      </SocialItem>
    </ul>
  );
}
