# wisam
مشروع تجريبي لاختبار ChatGPT Codex

## التشغيل
يتطلب Node.js 18+.

### التثبيت
```bash
npm install
```

### أوامر CLI
إضافة مستخدم:
```bash
node index.js add --name "Ali" --email "a@a.com"
```

عرض المستخدمين:
```bash
node index.js list
```

حذف مستخدم عبر البريد الإلكتروني:
```bash
node index.js delete --email "a@a.com"
```

### سكربتات npm
```bash
npm run start
npm run lint
```

## قاعدة البيانات
- يتم إنشاء ملف `app.db` تلقائيًا عند أول تشغيل.
- يتم تطبيق مخطط الجدول من `schema.sql`.
