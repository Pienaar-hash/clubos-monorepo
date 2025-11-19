// Root Monorepo: ClubOS

clubos/
├── README.md
├── package.json               // Root config (scripts, dev tools)
├── .env                      // Shared environment variables
├── docker-compose.yml        // Local dev environment (Postgres, Redis, etc.)
├── prisma/                   // Shared schema if using Prisma for DB
│   └── schema.prisma
├── apps/
│   ├── admin-dashboard/      // React (Vite or Next.js) + Tailwind
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── api/           // Frontend-side fetch logic
│   │   └── tailwind.config.js
│   ├── api-server/           // Node.js (Express/Nest) or Laravel API
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── bookings/
│   │   │   │   ├── inventory/
│   │   │   │   ├── staff/
│   │   │   │   ├── payments/
│   │   │   │   └── marketing/
│   │   │   ├── jobs/
│   │   │   └── routes/
│   │   └── .env
│   ├── pos-terminal/         // Optional: Tablet/kiosk POS frontend
│   │   └── src/
│   │       ├── screens/
│   │       ├── components/
│   │       └── utils/
├── services/
│   ├── playtomic-sync/       // Cron/worker to pull bookings
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── utils/
│   │   │   │   └── fetchBookings.ts // Playtomic API GET /bookings logic
│   │   │   └── jobs/
│   │   │       └── syncDailyBookings.ts
│   │   └── .env // PLAYTOMIC_API_KEY, PLAYTOMIC_CLUB_ID
│   ├── yoco-sync/            // Sales + payment recon
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── utils/
│   │   │   │   └── fetchTransactions.ts // Yoco API GET /charges logic
│   │   │   └── jobs/
│   │   │       └── syncDailySales.ts
│   │   └── .env // YOCO_API_KEY
│   ├── notifications-bot/    // WhatsApp/Email/Meta triggers
│   └── booking-core/         // Wrap LibreBooking or OpenSTAManager module
├── db/
│   └── seed/
│       ├── dev-users.ts
│       ├── sample-products.ts
├── scripts/
│   └── migrate.sh
└── docs/
    ├── architecture.md
    ├── api-spec.md
    └── integration-playbook.md
