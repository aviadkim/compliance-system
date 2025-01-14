# Compliance System

מערכת לניהול שיחות והקלטות עם תמיכה בדרישות רגולטוריות

## תכונות
- הקלטת שיחות בזמן אמת
- תמלול אוטומטי בעברית
- זיהוי דוברים וצביעת טקסט לפי דובר
- שליחת סיכומי שיחה במייל
- שמירת מסמכים בענן (Firebase/Google Drive)
- מעקב אחר שאלות רגולטוריות
- בדיקות מערכת אוטומטיות

## התקנה
```bash
# Clone the repository
git clone https://github.com/aviadkim/compliance-system.git

# Install dependencies
cd compliance-system
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm start
```

## מבנה הפרויקט
```
compliance-system/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── backend/           # Node.js backend
│   ├── src/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
└── README.md
```

## טכנולוגיות
- Frontend: React.js
- Backend: Node.js + Express
- Database: Firebase
- Storage: Google Drive/Firebase Storage
- Speech Recognition: Web Speech API
- Email: Nodemailer