import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const genres = await Promise.all(
    [
      { name: 'Fiction', slug: 'fiction' },
      { name: 'Science Fiction', slug: 'sci-fi' },
      { name: 'History', slug: 'history' },
      { name: 'Fantasy', slug: 'fantasy' },
    ].map((g) =>
      prisma.genre.upsert({
        where: { slug: g.slug },
        update: {},
        create: g,
      }),
    ),
  );

  const booksByGenre: Record<string, string[]> = {
    fiction: [
      'To Kill a Mockingbird',
      '1984',
      'The Great Gatsby',
      'The Catcher in the Rye',
    ],
    'sci-fi': ['Dune', 'Neuromancer', 'Foundation', 'Snow Crash'],
    history: [
      'Sapiens',
      'Guns, Germs, and Steel',
      'The Silk Roads',
      'SPQR',
    ],
    fantasy: [
      'The Hobbit',
      'The Name of the Wind',
      'Mistborn',
      'The Way of Kings',
    ],
  };

  let counter = 0;
  for (const genre of genres) {
    for (const title of booksByGenre[genre.slug]) {
      counter++;
      await prisma.book.upsert({
        where: { isbn: `978-000000-${String(counter).padStart(4, '0')}` },
        update: {},
        create: {
          title,
          author: 'Various',
          isbn: `978-000000-${String(counter).padStart(4, '0')}`,
          genreId: genre.id,
        },
      });
    }
  }

  await prisma.user.upsert({
    where: { email: 'librarian@library.test' },
    update: {},
    create: {
      email: 'librarian@library.test',
      name: 'Head Librarian',
      role: 'LIBRARIAN',
    },
  });
  await prisma.user.upsert({
    where: { email: 'patron@library.test' },
    update: {},
    create: {
      email: 'patron@library.test',
      name: 'Test Patron',
      role: 'PATRON',
    },
  });

  console.log(`Seeded ${counter} books across ${genres.length} genres.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
