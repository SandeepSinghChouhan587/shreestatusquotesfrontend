
const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 py-16 px-6 md:px-16 lg:px-24 text-white">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
          Terms & Conditions
        </h1>

        {/* Intro Paragraph */}
        <p className="text-white/80 leading-relaxed mb-6">
          Welcome to <span className="font-semibold">Shree Status Quotes</span>. 
          By using this website, you agree to comply with our terms and conditions. 
          All content, including quotes and images, is provided for personal use only.
        </p>

        {/* Terms List */}
        <ol className="list-decimal list-inside text-white/80 space-y-4 mb-6">
          <li>
            All quotes and images are for personal use. Re-uploading or distributing 
            content without permission is strictly prohibited.
          </li>
          <li>
            Users are responsible for their own use of content on social media or other platforms.
          </li>
          <li>
            We do not guarantee the accuracy or completeness of the quotes provided.
          </li>
          <li>
            The website reserves the right to update, modify, or remove content at any time.
          </li>
          <li>
            By using this website, you agree to these terms and conditions in full.
          </li>
        </ol>

        {/* Conclusion */}
        <p className="text-white/70 leading-relaxed">
          Thank you for using <span className="font-semibold">Shree Status Quotes</span>. 
          Please respect the content and the community by following these guidelines.
        </p>
      </div>
    </div>
  );
};

export default Terms;
