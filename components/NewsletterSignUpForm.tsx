import React from "react";

export default function NewsletterSignUpForm() {
  return (
    <form
      id="revue-form"
      name="revue-form"
      action="https://www.getrevue.co/profile/brockherion/add_subscriber"
      method="post"
      target="_blank"
      className="flex flex-col md:items-center md:justify-center md:px-12"
    >
      <input
        className="w-full bg-gray-100 px-4 py-2 rounded-md mb-2"
        id="member_email"
        name="member[email]"
        type="email"
        placeholder="Your email address..."
        required
      />
      <button
        className="w-full bg-yellow-300 px-4 py-2 rounded-md text-slate-800 font-bold mb-2"
        type="submit"
      >
        Subscribe
      </button>
      <div className="w-full text-sm text-center italic">
        By subscribing, you agree with Revue’s{" "}
        <a target="_blank" href="https://www.getrevue.co/terms">
          Terms of Service
        </a>{" "}
        and{" "}
        <a target="_blank" href="https://www.getrevue.co/privacy">
          Privacy Policy
        </a>
        .
      </div>
    </form>
  );
}
