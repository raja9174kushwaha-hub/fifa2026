import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';


export async function GET(request) {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { name: 'asc' }
    });
    
    if (teams.length === 0) {
      throw new Error('No teams in database');
    }
    
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams from database, using JSON fallback:', error);
    try {
      const teamsDataPath = path.join(process.cwd(), 'src/data/teams.json');
      if (fs.existsSync(teamsDataPath)) {
        const teamsData = JSON.parse(fs.readFileSync(teamsDataPath, 'utf8'));
        const flatTeams = Object.values(teamsData.groups).flat().sort((a, b) => a.name.localeCompare(b.name));
        return NextResponse.json(flatTeams);
      }
    } catch (fsError) {
      console.error('Failed to read teams.json fallback:', fsError);
    }
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}
