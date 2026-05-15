import '../styles/Features.css';

function Features() {
  const features = [
    {
      id: 'feature-1',
      title: 'Curated Texts',
      description: 'High-quality academic materials selected by expert linguists'
    },
    {
      id: 'feature-2',
      title: 'Interactive Learning',
      description: 'Engage with content through annotations and contextual explanations'
    },
    {
      id: 'feature-3',
      title: 'Progress Tracking',
      description: 'Monitor your vocabulary growth and comprehension improvements'
    }
  ];

  return (
    <section className="features section" data-testid="features-section">
      <div className="container">
        <h2 className="section-title" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-features-title">
          Why Choose Linguist Library
        </h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card" data-testid={`feature-${feature.id}`}>
              <h3 className="feature-title" data-stitch-id={`45ac4478a1b7455f861d7377f92105e6-${feature.id}-title`}>
                {feature.title}
              </h3>
              <p className="feature-description" data-stitch-id={`45ac4478a1b7455f861d7377f92105e6-${feature.id}-desc`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
