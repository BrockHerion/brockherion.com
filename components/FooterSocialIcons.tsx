import React from "react";
import {
  FiTwitter,
  FiYoutube,
  FiTwitch,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";

export default function FooterSocialIcons() {
  return (
    <ul className="flex items-center justify-center">
      <li className="mr-3">
        <a href="https://twitter.com/BrockHerion" target="_blank">
          <FiTwitter className="text-white" size="1.75em" />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://twitch.tv/brockherion" target="_blank">
          <FiYoutube className="text-white" size="1.75em" />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://twitch.tv/brockherion" target="_blank">
          <FiTwitch className="text-white" size="1.75em" />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://github.com/brockherion" target="_blank">
          <FiGithub className="text-white" size="1.75em" />
        </a>
      </li>
      <li className="mr-3">
        <a
          href="https://www.linkedin.com/in/brock-j-herion-34279a176/"
          target="_blank"
        >
          <FiLinkedin className="text-white" size="1.75em" />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://www.instagram.com/brock_herion/" target="_blank">
          <FiInstagram className="text-white" size="1.75em" />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/Brock-Herion-197864878943988"
          target="_blank"
        >
          <FiFacebook className="text-white" size="1.75em" />
        </a>
      </li>
    </ul>
  );
}
