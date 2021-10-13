import React from "react";

export default function NewsletterSignUpForm() {
  return (
    <form
      id="revue-form"
      name="revue-form"
      action="https://www.getrevue.co/profile/brockherion/add_subscriber"
      method="post"
      target="_blank"
    >
      <div className="flex items-center justify-center mb-2">
        <input
          className="bg-gray-100 px-4 py-2 rounded-xl mr-2"
          id="member_email"
          name="member[email]"
          type="email"
          placeholder="Your email address..."
          required
        />
        <button
          className="bg-yellow-300 px-4 py-2 rounded-xl text-gray-800 font-bold"
          type="submit"
        >
          Subscribe
        </button>
      </div>
      <div className="text-sm text-center italic">
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
