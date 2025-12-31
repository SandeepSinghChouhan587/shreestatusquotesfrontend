import React from "react";

const About = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 px-6 py-16 md:px-20">
      {/* Glass Card */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 md:p-14 text-white">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          About Shree Status Quotes
        </h1>

        {/* Intro */}
        <p className="leading-relaxed text-gray-200 mb-6">
          Welcome to <span className="font-semibold text-white">Shree Status Quotes</span>, 
          a platform created to share meaningful, emotional, and motivational quotes 
          that connect deeply with people. In today’s fast-paced digital world, words 
          have the power to inspire, heal, and motivate — and that is exactly what we aim to deliver.
        </p>

        <p className="leading-relaxed text-gray-200 mb-6">
          Our platform is designed for those who love expressing emotions through words. 
          Whether it’s motivation, life lessons, spirituality, or relationships, 
          Shree Status Quotes brings thoughtfully curated content for every mood.
        </p>

        {/* Vision */}
        <h2 className="text-2xl font-semibold text-pink-300 mt-10 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-200 leading-relaxed">
          Our vision is to become a trusted destination for inspirational and meaningful quotes.
          We aim to spread positivity, confidence, and clarity through carefully crafted words
          that resonate with people across all walks of life.
        </p>

        {/* What We Offer */}
        <h2 className="text-2xl font-semibold text-pink-300 mt-10 mb-4">
          What We Offer
        </h2>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Motivational and Success Quotes</li>
          <li>Life and Reality-Based Thoughts</li>
          <li>Love and Relationship Status</li>
          <li>Spiritual and Devotional Quotes</li>
          <li>Attitude and Confidence Lines</li>
          <li>Fresh, Trending & Shareable Content</li>
        </ul>

        {/* Mission */}
        <h2 className="text-2xl font-semibold text-pink-300 mt-10 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-200 leading-relaxed">
          Our mission is to inspire people through words. A single quote can change
          a mindset, uplift emotions, and spark motivation. Through Shree Status Quotes,
          we aim to deliver positivity and meaningful expression every single day.
        </p>

        {/* AI Disclaimer Section */}
        <h2 className="text-2xl font-semibold text-pink-300 mt-10 mb-4">
          Image & Content Disclaimer
        </h2>
        <p className="text-gray-200 leading-relaxed">
          All images used on this website are generated using Artificial Intelligence (AI)
          and are meant solely for creative and illustrative purposes. These images do not
          represent any real person, celebrity, or individual.
        </p>
        <p className="text-gray-200 leading-relaxed mt-3">
          Any resemblance to real persons is purely coincidental. Quotes published on this
          platform are intended for inspiration and motivation only.
        </p>

        {/* Future Vision */}
        <h2 className="text-2xl font-semibold text-pink-300 mt-10 mb-4">
          Looking Ahead
        </h2>
        <p className="text-gray-200 leading-relaxed">
          We are continuously improving our platform with better categorization,
          trending content, and an enhanced user experience. Our goal is to make
          Shree Status Quotes a trusted and loved destination for quote lovers.
        </p>

        {/* Footer Line */}
        <p className="text-center text-gray-300 mt-12 font-medium">
          Thank you for being a part of{" "}
          <span className="text-pink-300 font-semibold">Shree Status Quotes</span>.
        </p>
      </div>
    </section>
  );
};

export default About;
