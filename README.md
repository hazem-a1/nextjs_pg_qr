# Next.js Project with Authentication and Database Integration

This project is a Next.js application that integrates authentication using NextAuth.js, Drizzle ORM for database operations, and various other libraries for enhanced functionality, creating short link with customizable qrcode design.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/) with [Drizzle Adapter](https://authjs.dev/reference/adapter/drizzle)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon Database](https://neon.tech/)
- [Tailwind CSS](https://tailwindcss.com/) with [Forms plugin](https://github.com/tailwindlabs/tailwindcss-forms)
- [QR Code Styling](https://github.com/kozakdenys/qr-code-styling)
- [Postgres](https://www.postgresql.org/)

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed
- A Postgres database (we recommend Neon for serverless Postgres)
- GitHub OAuth credentials
- Google OAuth credentials

## Environment Setup

Create a `.env` file in the root directory of the project and add the following variables:

postgres URL

DATABASE_URL='postgresql://user:pass@host/dbname?sslmode=require'

GitHub credentials

GITHUB_ID=your_github_id

GITHUB_SECRET=your_github_secret

Next.js URLs

NEXTAUTH_URL=<http://localhost:3000>

NEXT_PUBLIC_DOMAIN=<http://localhost:3000>

NEXTAUTH_SECRET=your_nextauth_secret

Google credentials

GOOGLE_SECRET=your_google_secret

GOOGLE_ID=your_google_id

Replace the placeholders with your actual credentials and URLs.

## Getting Started

1. Clone the repository:
git clone <https://github.com/hazem-a1/nextjs_pg_qr.git>
cd nextjs_pg_qr

2. Install dependencies:
3. Generate the database schema:
4. Deploy the schema to your database:
5. Start the development server:

------------------------

The application should now be running at `https://qr-star.vercel.app/`.

## Deploying to Vercel

To deploy this project to Vercel:

1. Push your code to a GitHub repository.

2. Sign up for a [Vercel account](https://vercel.com/signup) if you haven't already.

3. Click on "New Project" in your Vercel dashboard.

4. Import your GitHub repository.

5. Configure your project:

- Vercel should automatically detect that it's a Next.js project.
- In the "Environment Variables" section, add all the variables from your `.env` file.

6. Click "Deploy" and wait for the build to complete.

Vercel will provide you with a deployment URL once the process is finished.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
