import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';


export async function GET(request) {
  try {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
      }
    });
    
    if (matches.length === 0) {
      throw new Error('No matches in database');
    }
    
    // Transform Prisma output to match the expected format of the frontend
    const formattedMatches = matches.map(match => ({
      id: parseInt(match.id),
      date: match.date,
      time: match.time,
      stage: match.stage,
      stadium: match.stadium,
      status: match.status,
      homeTeam: {
        code: match.homeTeam.code,
        name: match.homeTeam.name,
        flag: match.homeTeam.flag,
        score: match.homeScore
      },
      awayTeam: {
        code: match.awayTeam.code,
        name: match.awayTeam.name,
        flag: match.awayTeam.flag,
        score: match.awayScore
      }
    }));
    
    return NextResponse.json(formattedMatches);
  } catch (error) {
    console.error('Error fetching matches from database, using JSON fallback:', error);
    try {
      const matchesDataPath = path.join(process.cwd(), 'src/data/matches.json');
      if (fs.existsSync(matchesDataPath)) {
        const matchesData = JSON.parse(fs.readFileSync(matchesDataPath, 'utf8'));
        return NextResponse.json(matchesData);
      }
    } catch (fsError) {
      console.error('Failed to read matches.json fallback:', fsError);
    }
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}
