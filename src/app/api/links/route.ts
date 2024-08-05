import { NextResponse, NextRequest} from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';
import { db } from '@/db';
import LinkRepository from '@/db/repositories/link.repository';

export async function POST(req: NextRequest) { 
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {

    const LinkRepo = new LinkRepository(db);

    const json = await req.json();
    
    const { shortCode, targetUrl, qrStyleOptions } = json;
    
    // Check if shortCode already exists
    const existingLink = await LinkRepo.findLinkByShortCode(shortCode);
    
    if (existingLink) {
      return NextResponse.json({ error: 'Short code already in use' }, { status: 400 });
    }
    const newLink = await LinkRepo.insertOne({
      shortCode,
      targetUrl,
      qrStyleOptions,
      createdBy: session.user.id
    })
    
    return NextResponse.json({ newLink }, { status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Error creating link' }, { status: 500 });
  }
}
