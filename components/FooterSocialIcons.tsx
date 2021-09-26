import React from "react";
import {
  Twitter,
  Twitch,
  GitHub,
  Linkedin,
  Instagram,
  Facebook,
} from "react-feather";

export default function FooterSocialIcons() {
  return (
    <ul className="flex items-center justify-center">
      <li className="mr-3">
        <a href="https://twitter.com/BrockHerion" target="_blank">
          <Twitter color="#F3F4F6" />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://twitch.tv/brockherion" target="_blank">
          <Twitch color="#F3F4F6" />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://github.com/brockherion" target="_blank">
          <GitHub color="#F3F4F6" />
        </a>
      </li>
      <li className="mr-3">
        <a
          href="https://www.linkedin.com/in/brock-j-herion-34279a176/"
          target="_blank"
        >
          <Linkedin color="#F3F4F6" />
        </a>
      </li>
      <li className="mr-3">
        <a href="https://www.instagram.com/brock_herion/" target="_blank">
          <Instagram color="#F3F4F6" />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/Brock-Herion-197864878943988"
          target="_blank"
        >
          <Facebook color="#F3F4F6" />
        </a>
      </li>
    </ul>
  );
}
