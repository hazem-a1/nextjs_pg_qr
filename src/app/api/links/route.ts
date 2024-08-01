import { NextResponse, NextRequest} from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth/authOptions';
import { db } from '@/db';
import { dynamicLinks } from '@/db/schema/dynamicLink';
import { eq } from 'drizzle-orm';

 

export async function POST(req: NextRequest) {
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const json = await req.json();
    
    const { shortCode, targetUrl, qrStyleOptions } = json;
    
    // Check if shortCode already exists
    const [existingLink] = await db.select().from(dynamicLinks).where(eq(dynamicLinks.shortCode, shortCode)).limit(1);
    if (existingLink) {
      return NextResponse.json({ error: 'Short code already in use' }, { status: 400 });
    }

    const newLink = await db.insert(dynamicLinks).values({
      shortCode,
      targetUrl,
      qrStyleOptions,
      createdBy: session.user.id
    }).returning();
    
    return NextResponse.json({ newLink }, { status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Error creating link' }, { status: 500 });
  }
}
