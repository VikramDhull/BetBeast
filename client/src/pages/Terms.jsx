import React from "react";
import Navbar from "../components/Navbar";

const Terms = () => {
  return (
    <section className="bg-gray-900 min-h-screen ">
      <Navbar />
      <div className="bg-gray-50 text-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="orbitron text-4xl font-bold mb-6 text-gray-900">
            Terms & Conditions
          </h1>
          <p className="mb-6 text-gray-600">
            Welcome to <strong>BetBeast</strong>. By accessing or using our
            website, you agree to comply with the following Terms & Conditions.
            Please read them carefully before using our services.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Eligibility</h2>
          <p className="mb-4">
            You must be at least 18 years old (or the legal age of majority in
            your jurisdiction) to use this website. By using our services, you
            confirm that you meet this requirement.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            2. Purpose of Service
          </h2>
          <p className="mb-4">
            BetBeast provides access to unique roulette strategies and
            statistical tools designed to guide your gameplay. We do not offer
            real-money gambling or act as a casino. All decisions you make while
            playing are solely your responsibility.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            3. No Guarantee of Earnings
          </h2>
          <p className="mb-4">
            While our strategies are built on mathematics and proven experience,
            roulette remains a game of chance. We do not guarantee winnings,
            profits, or recovery of losses. Use of this site is at your own
            risk.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            4. User Responsibilities
          </h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Use the website for personal, non-commercial purposes only.</li>
            <li>Provide accurate information when creating an account.</li>
            <li>
              Take full responsibility for any bets or financial decisions you
              make while using our strategies.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            All strategies, content, design, and branding available on BetBeast
            are the intellectual property of the website owner. Unauthorized
            copying, sharing, or redistribution is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            6. Subscription & Payments
          </h2>
          <p className="mb-4">
            Access to certain features requires a paid subscription. By
            purchasing a plan, you agree to provide accurate payment
            information. All fees are non-refundable unless otherwise stated.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            BetBeast and its creators are not liable for any financial losses,
            damages, or consequences arising from the use of our strategies,
            tools, or website.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            8. Changes to Terms
          </h2>
          <p className="mb-4">
            We reserve the right to update or modify these Terms & Conditions at
            any time. Continued use of the website after changes are posted
            constitutes your acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">9. Contact</h2>
          <p className="mb-4">
            If you have any questions about these Terms & Conditions, you can
            contact us at{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              contact
            </a>
            .
          </p>

          <p className="mt-10 text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
