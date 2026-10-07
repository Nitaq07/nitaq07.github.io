# تطبيق منصة رفع البيانات — النطاق السابع 1448هـ

## ١) التعديل المطلوب في Apps Script (مرة واحدة)
في دالة `doGet` أضف السطر `setXFrameOptionsMode` إلى ما تُرجعه الدالة:

```javascript
function doGet(e) {
  // ... الكود الحالي كما هو ...
  return HtmlService.createHtmlOutputFromFile('Index')   // أو createTemplateFromFile(...).evaluate()
      .setTitle('منصة رفع البيانات النطاق السابع - 1448هـ')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);   // ← هذا السطر
}
```
- إذا كانت `doGet` فيها أكثر من `return` (مثلًا صفحة السجل `?view=log`) فأضف السطر لكل واحدة منها.
- بعدها: **نشر ← إدارة عمليات النشر ← تعديل (القلم) ← الإصدار: إصدار جديد ← نشر**. بهذه الطريقة يبقى الرابط نفسه.
- يجب أن تبقى إعدادات الوصول على **"أي شخص"** (Anyone)، لأن إعداد "أي شخص لديه حساب Google" لا يعمل داخل التطبيق.

## ٢) وضع الرابط في التطبيق
افتح `index.html` وابحث عن السطر:
```
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/ضع_المعرف_هنا/exec";
```
واستبدله برابط `/exec` الخاص بمنصتك. استخدم الرابط الأصلي من Google، وليس رابط TinyURL المختصر.

## ٣) النشر على GitHub Pages (مجانًا)
1. ادخل إلى github.com وأنشئ حسابًا إذا لم يكن لديك حساب.
2. اضغط **New repository**، وسمِّه مثلًا `nitaq7`، واختر **Public**، ثم **Create**.
3. اضغط **uploading an existing file** واسحب كل محتويات المجلد (index.html و manifest.json و sw.js ومجلد icons)، ثم **Commit changes**.
4. افتح **Settings ← Pages**، وتحت Branch اختر `main` و `/ (root)`، ثم **Save**.
5. بعد دقيقة أو دقيقتين يصبح الرابط: `https://اسم-حسابك.github.io/nitaq7/`

## ٤) التثبيت على الجوال
- **آيفون (Safari):** افتح الرابط ← زر المشاركة ← **إضافة إلى الشاشة الرئيسية**.
- **أندرويد (Chrome):** افتح الرابط ← تظهر رسالة **تثبيت التطبيق**، أو من القائمة ⋮ ← **تثبيت التطبيق**.

صفحة السجل تعمل بالطريقة نفسها: `https://اسم-حسابك.github.io/nitaq7/?view=log`

## ملاحظات
- أي تعديل تجريه لاحقًا في Apps Script يظهر في التطبيق تلقائيًا، ولا تحتاج إلى إعادة رفع ملفات GitHub.
- روابط واتساب (زر "إرسال التنبيه") يجب أن تفتح بـ `target="_blank"` كي تخرج من إطار التطبيق إلى واتساب.
- لتغيير الأيقونة إلى شعارك: استبدل الصور داخل مجلد `icons` بالأسماء والمقاسات نفسها (192، 512، 180، 32).
