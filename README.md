Primsa & Supabase Integration:
>Install Kinde Auth> "npm i @kinde-oss/kinde-auth-nextjs"

> Open Supabase> New Project> Create Organization> Create Project

> Install ORM/ Prisma> "npm i -D prisma"> "npm i @prisma/client"> "npx prisma init"> add .env in .gitignore 

>Goto supabase prisma integrations site & copy DATABASE_URL, DIRECT_URL for .env

>Supabase Prisma Integrations & replace -datasource db> Add model User> "npx prisma db push"

>Goto- Next Js Prisma Best Practices> paste "Prisma Client" @app>lib>db.ts

>Create App>Api>Auth>route.ts

>Create App> create> [id]> layout(flie)/ structure(folder)> page.tsx

>"npx prisma generate"

>Check DB: "npx prisma studio"

>Integrate Supabase "npm install @supabase/supabase-js"> Project Setting> Api (Project URL), (Public Key)> Paste @.env

>Supabase create bucket> Create Policy (description= true)

>"npm i world-countries"
