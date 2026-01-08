import { useMemo, useState } from "react";

const content = {
  ar: {
    direction: "rtl",
    title: "جمعية نبض الخيرية",
    subtitle: "معًا نصنع أثرًا عالميًا عبر مشاريع إنسانية مستدامة.",
    cta: "تبرّع الآن",
    impact: [
      { label: "عدد المستفيدين", value: "+120K" },
      { label: "المشاريع المنجزة", value: "350" },
      { label: "حملات الخير", value: "48" }
    ],
    features: [
      {
        title: "مشاريعنا",
        description: "عرض احترافي لمشاريع قيد التنفيذ والمشاريع السابقة مع قصص نجاح ملهمة."
      },
      {
        title: "شفافية تامة",
        description: "تقارير موثوقة وتحديثات دورية توضح أثر كل تبرع."
      },
      {
        title: "تجربة عالمية",
        description: "واجهة ثنائية اللغة وتصميم متجاوب يناسب جميع الأجهزة."
      }
    ],
    internalTitle: "النظام الداخلي",
    internalItems: [
      {
        title: "الرؤية والرسالة",
        content: "بناء مجتمع متكافل وداعم يحفظ كرامة الإنسان ويصنع مستقبلًا أفضل."
      },
      {
        title: "سياسات الحوكمة",
        content: "معايير صارمة لضمان الشفافية والإدارة الرشيدة للموارد."
      },
      {
        title: "مدونة السلوك",
        content: "قيم راسخة تُلزم الفريق بالنزاهة والاحترافية والمسؤولية."
      }
    ],
    footer: "برمجة وتطوير وسام سليم الحجة"
  },
  en: {
    direction: "ltr",
    title: "Nabd Charity Association",
    subtitle: "Together we create global impact through sustainable humanitarian projects.",
    cta: "Donate Now",
    impact: [
      { label: "Beneficiaries", value: "120K+" },
      { label: "Completed Projects", value: "350" },
      { label: "Active Campaigns", value: "48" }
    ],
    features: [
      {
        title: "Our Projects",
        description: "Professional presentation for active and past projects with inspiring stories."
      },
      {
        title: "Total Transparency",
        description: "Trusted reports and regular updates to show the impact of every donation."
      },
      {
        title: "Global Experience",
        description: "Bilingual interface and responsive design for every device."
      }
    ],
    internalTitle: "Internal System",
    internalItems: [
      {
        title: "Vision & Mission",
        content: "Building a supportive community that protects dignity and creates a better future."
      },
      {
        title: "Governance Policies",
        content: "Strict standards to ensure transparency and responsible resource management."
      },
      {
        title: "Code of Conduct",
        content: "Core values that keep our team ethical, professional, and accountable."
      }
    ],
    footer: "Developed by Wissam Salim Al-Haja"
  }
};

export default function Home() {
  const [language, setLanguage] = useState("ar");
  const active = useMemo(() => content[language], [language]);

  return (
    <div className="page" dir={active.direction}>
      <header className="hero">
        <nav className="nav">
          <div className="logo">{active.title}</div>
          <button
            className="lang-toggle"
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
          >
            {language === "ar" ? "English" : "العربية"}
          </button>
        </nav>
        <div className="hero-content">
          <h1>{active.title}</h1>
          <p>{active.subtitle}</p>
          <button className="cta">{active.cta}</button>
        </div>
      </header>

      <section className="impact">
        {active.impact.map((item) => (
          <div key={item.label} className="impact-card">
            <span className="impact-value">{item.value}</span>
            <span className="impact-label">{item.label}</span>
          </div>
        ))}
      </section>

      <section className="features">
        {active.features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="internal">
        <h2>{active.internalTitle}</h2>
        <div className="accordion">
          {active.internalItems.map((item) => (
            <details key={item.title} className="accordion-item">
              <summary>{item.title}</summary>
              <p>{item.content}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>{active.footer}</p>
      </footer>
    </div>
  );
}
