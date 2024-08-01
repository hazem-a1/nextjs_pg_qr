import { authOptions } from '@/auth/authOptions';
import { db } from '@/db';
import { dynamicLinks } from '@/db/schema/dynamicLink';
import { and, eq, not } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {

      const {id} = params;

      const [link] = await db.select().from(dynamicLinks).where(eq(dynamicLinks.id, id)).limit(1);

        if (!link) {
          return NextResponse.json({ error: 'Link not found' }, { status: 404 });
        }
        return NextResponse.json(link, { status: 200 });

  } catch (error) {
    
    return NextResponse.json({ error: 'Error fetching link' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {

      const {id} = params;
      const [deletedLink] = await db.delete(dynamicLinks).where(eq(dynamicLinks.id, id)).returning();

      if (!deletedLink) {
        return NextResponse.json({ error: 'Link not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Link deleted successfully' }, { status: 200 });

  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Error deleting link' }, { status: 500 });
  }
}




export async function PUT(req: NextRequest,{ params }: { params: { id: string } }) {
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const { shortCode, targetUrl, qrStyleOptions } = json;
    const { id } = params
      
      // Check if new shortCode already exists (excluding the current link)
      const [existingLink] = await db.select().from(dynamicLinks).where(and(
        not(eq(dynamicLinks.id,id)),
        eq(dynamicLinks.shortCode, shortCode)
      )).limit(1);
     
      if (existingLink) {
        return NextResponse.json({ error: 'Short code already in use' }, { status: 400 });
      }

      // Update a dynamic link
      const [updatedLink] = await db.update(dynamicLinks)
        .set({ shortCode, targetUrl, qrStyleOptions })
        .where(
          and(
            eq(dynamicLinks.createdBy, session.user.id),
            eq(dynamicLinks.id, id)
          ) 
        )
        .returning();
      
        if (!updatedLink) {
        return NextResponse.json({ error: 'Link not found' }, { status: 404 });
      }
    
      return NextResponse.json({ updatedLink }, { status: 200 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'Error updating link' }, { status: 500 });
  }
}