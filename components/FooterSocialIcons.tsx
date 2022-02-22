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
          <FiTwitter
            className="dark:text-slate-100 text-gray-800"
            size="1.75em"
          />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://twitch.tv/brockherion" target="_blank">
          <FiYoutube
            className="dark:text-slate-100 text-gray-800"
            size="1.75em"
          />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://twitch.tv/brockherion" target="_blank">
          <FiTwitch
            className="dark:text-slate-100 text-gray-800"
            size="1.75em"
          />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://github.com/brockherion" target="_blank">
          <FiGithub
            className="dark:text-slate-100 text-gray-800"
            size="1.75em"
          />
        </a>
      </li>
      <li className="mr-3">
        <a
          href="https://www.linkedin.com/in/brock-j-herion-34279a176/"
          target="_blank"
        >
          <FiLinkedin
            className="dark:text-slate-100 text-gray-800"
            size="1.75em"
          />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://www.instagram.com/brock_herion/" target="_blank">
          <FiInstagram
            className="dark:text-slate-100 text-gray-800"
            size="1.75em"
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/Brock-Herion-197864878943988"
          target="_blank"
        >
          <FiFacebook
            className="dark:text-slate-100 text-gray-800"
            size="1.75em"
          />
        </a>
      </li>
    </ul>
  );
}
