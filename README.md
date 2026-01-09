# wisam

هذا المشروع يحتوي على:

- سكربت CLI لإدارة جمعية صغيرة باستخدام Node.js و SQLite.
- واجهة زوار حديثة (واجهة ويب) لتعريف الجمعية وبرامجها.

## المتطلبات

- Node.js (يفضّل أحدث إصدار مستقر)

## التثبيت

```bash
npm install
```

## التشغيل (سكربت CLI)

> عند أول تشغيل سيتم إنشاء مجلد `data/` تلقائياً وإنشاء قاعدة البيانات وتطبيق المخطط.

### إضافة عضو

```bash
node app.js member:add --name "Ali" --phone "050..." --email "a@a.com"
```

### عرض الأعضاء

```bash
node app.js member:list
```

### حذف عضو

```bash
node app.js member:delete --id 1
```

### إضافة تبرع

```bash
node app.js donation:add --amount 100 --note "تبرع عام" --member_id 1
```

> خيار `--member_id` اختياري. يمكنك حذف هذا الخيار لتسجيل تبرع عام غير مرتبط بعضو.

### عرض التبرعات

```bash
node app.js donation:list
```

## تشغيل واجهة الزوار (واجهة ويب)

يمكنك فتح الملف مباشرة في المتصفح:

```bash
open index.html
```

أو تشغيل خادم محلي بسيط:

```bash
python -m http.server 8000
```

ثم زيارة:

```
http://localhost:8000
```
