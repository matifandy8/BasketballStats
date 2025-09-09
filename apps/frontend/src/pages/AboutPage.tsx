const AboutPage: React.FC = () => {
  console.log('render about page');
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md text-left ">
      <h1 className="text-3xl font-bold mb-6">About NBA and WNBA Stats</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold  mb-3">Our Mission</h2>
          <p className="leading-relaxed">
            At NBA Stats, we're passionate about bringing you the most comprehensive and up-to-date
            statistics and news about the National Basketball Association. Our goal is to provide
            fans with insightful analytics, player stats, and game highlights all in one place.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold  mb-3">What We Offer</h2>
          <ul className="list-disc space-y-2 text-gray-200">
            <li>Real-time game statistics and scores</li>
            <li>Detailed player profiles and career stats</li>
            <li>Team performance analytics</li>
            <li>Latest NBA news and updates</li>
            <li>Historical data and records</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold  mb-3">Our Team</h2>
          <p className="leading-relaxed">
            Our team consists of basketball enthusiasts, data analysts, and web developers who are
            dedicated to delivering the best NBA statistics experience. We combine our love for the
            game with technical expertise to bring you accurate and engaging content.
          </p>
        </section>

        <section className="pt-4 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-300">
            Have questions or feedback? We'd love to hear from you at{' '}
            <a href="mailto:contact@nbastats.com" className=" hover:underline">
              contact@nbastats.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
