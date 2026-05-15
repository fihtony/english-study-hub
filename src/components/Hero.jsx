import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero" data-testid="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-title">
            Premium Academic English
          </h1>
          <p className="hero-subtitle reading" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-subtitle">
            Master advanced English with curated academic texts and expert guidance
          </p>
          <div className="hero-cta">
            <button className="btn-primary" data-testid="cta-primary">
              Get Started
            </button>
            <button className="btn-secondary" data-testid="cta-secondary">
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-image">
            Featured Content
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
