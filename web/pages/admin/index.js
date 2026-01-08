export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>لوحة التحكم</h1>
          <p>جمعية نبض الخيرية</p>
        </div>
        <span className="dashboard-badge">لوحة المشرفين</span>
      </header>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <h3>المشاريع النشطة</h3>
          <p>18 مشروعًا قيد التنفيذ</p>
        </div>
        <div className="dashboard-card">
          <h3>التبرعات هذا الشهر</h3>
          <p>125,000 $</p>
        </div>
        <div className="dashboard-card">
          <h3>عدد المتبرعين</h3>
          <p>4,560 متبرعًا</p>
        </div>
      </section>

      <section className="dashboard-footer">
        <p>برمجة وتطوير وسام سليم الحجة</p>
      </section>
    </div>
  );
}
