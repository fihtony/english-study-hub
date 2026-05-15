import '../styles/CTA.css';

function CTA() {
  return (
    <section className="cta section" data-testid="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-cta-title">
            Ready to Start Learning?
          </h2>
          <p className="cta-description reading" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-cta-desc">
            Join thousands of English learners who have transformed their academic reading skills
          </p>
          <button className="btn-primary btn-large" data-testid="cta-button">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
