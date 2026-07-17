const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Seed Teams
  const teamsDataPath = path.join(__dirname, '../src/data/teams.json');
  if (fs.existsSync(teamsDataPath)) {
    const teamsData = JSON.parse(fs.readFileSync(teamsDataPath, 'utf8'));
    for (const group of Object.values(teamsData.groups)) {
      for (const team of group) {
        await prisma.team.upsert({
          where: { id: team.id },
          update: {},
          create: {
            id: team.id,
            name: team.name,
            flag: team.flag,
            region: team.region || 'Unknown',
            fifaRanking: team.fifaRanking || 99,
            code: team.code || team.id.toUpperCase(),
          },
        });
      }
    }
    console.log('Seeded teams.');
  }

  // 2. Seed Matches
  const matchesDataPath = path.join(__dirname, '../src/data/matches.json');
  if (fs.existsSync(matchesDataPath)) {
    const matchesData = JSON.parse(fs.readFileSync(matchesDataPath, 'utf8'));
    for (const match of matchesData) {
      await prisma.match.upsert({
        where: { id: match.id.toString() },
        update: {},
        create: {
          id: match.id.toString(),
          date: match.date,
          time: match.time,
          stadium: match.stadium,
          stage: match.stage,
          status: match.status,
          homeTeamId: match.homeTeam.code.toLowerCase(),
          homeScore: match.homeTeam.score,
          awayTeamId: match.awayTeam.code.toLowerCase(),
          awayScore: match.awayTeam.score,
        },
      });
    }
    console.log('Seeded matches.');
  }

  // 3. Seed Products
  const productsDataPath = path.join(__dirname, '../src/data/products.json');
  if (fs.existsSync(productsDataPath)) {
    const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
    
    for (const item of productsData.merchandise) {
      await prisma.product.upsert({
        where: { id: item.id },
        update: {},
        create: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          tag: item.tag || null,
          category: item.category || 'Apparel',
          type: 'merchandise',
        },
      });
    }
    
    for (const item of productsData.collectibles) {
      await prisma.product.upsert({
        where: { id: item.id },
        update: {},
        create: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.logo || '🏆', // Collectibles use 'logo'
          type: 'collectible',
          club: item.club || null,
          category: item.type || 'NFT',
        },
      });
    }
    console.log('Seeded products.');
  }

  // 4. Seed Users
  const passwordHash = await bcrypt.hash('password123', 10);
  const users = [
    { email: 'admin@fifa.com', name: 'Admin', role: 'admin', passwordHash },
    { email: 'manager@fifa.com', name: 'Manager', role: 'management', passwordHash },
    { email: 'fan@fifa.com', name: 'Fan User', role: 'fan', passwordHash }
  ];
  
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { passwordHash, role: u.role },
      create: u,
    });
  }
  console.log('Seeded users.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeding finished.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
