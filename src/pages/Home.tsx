import { useTranslation } from 'react-i18next'

const Home = ({}) => {
    const { t } = useTranslation();
    return (
    <>
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>{t('hero.title.part1')} <span className="highlight">{t('hero.title.part2')}</span> {t('hero.title.part3')}</h1>
            <p>{t('hero.subtitle')}</p>
            <a href="#contact" className="cta-button">{t('hero.cta')}</a>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">{t('services.title')}</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-number">01</div>
              <h3>{t('services.items.1.title')}</h3>
              <p>{t('services.items.1.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-number">02</div>
              <h3>{t('services.items.2.title')}</h3>
              <p>{t('services.items.2.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-number">03</div>
              <h3>{t('services.items.3.title')}</h3>
              <p>{t('services.items.3.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-number">04</div>
              <h3>{t('services.items.4.title')}</h3>
              <p>{t('services.items.4.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-number">05</div>
              <h3>{t('services.items.5.title')}</h3>
              <p>{t('services.items.5.desc')}</p>
            </div>
            <div className="service-card">
              <div className="service-number">06</div>
              <h3>{t('services.items.6.title')}</h3>
              <p>{t('services.items.6.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>{t('about.title')}</h2>
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <div className="stats">
                <div className="stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">{t('about.stats.projects')}</div>
                </div>
                <div className="stat">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">{t('about.stats.years')}</div>
                </div>
                <div className="stat">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">{t('about.stats.satisfaction')}</div>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="code-block">
                <div className="code-line"><span className="code-comment">// nestosoft/core.ts</span></div>
                <div className="code-line"><span className="code-keyword">export</span> <span className="code-keyword">const</span> build = (<span className="code-keyword">idea</span>: string) =&gt; {'{'}</div>
                <div className="code-line">  <span className="code-keyword">return</span> <span className="code-string">{t('about.codeLine')}</span></div>
                <div className="code-line">{'}'}</div>
                <div className="code-line code-comment">{t('about.codeComment')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
          <div className="contact-info">
            <div className="contact-item">
              <h4>{t('contact.emailLabel')}</h4>
              <p>hello@nestosoft.com</p>
            </div>
            <div className="contact-item">
              <h4>{t('contact.locationLabel')}</h4>
              <p>{t('contact.locationValue')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
    )
}

export default Home