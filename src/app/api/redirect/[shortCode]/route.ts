import { db } from '@/db';
import { dynamicLinks } from '@/db/schema/dynamicLink';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest,{ params }: { params: { shortCode: string } }) {
 
  
  try {

      const {shortCode} = params;
      const [link] = await db.select().from(dynamicLinks).where(eq(dynamicLinks.shortCode, shortCode)).limit(1);
      // const link = await DynamicLink.findOne({ shortCode });
        if (link?.targetUrl) {
          return NextResponse.redirect(link.targetUrl)
        }else {
          return NextResponse.json({ error: 'link not found' }, { status: 404 });
        }
  } catch (error) {
    
    return NextResponse.json({ error: 'Error fetching link' }, { status: 500 });
  }
}
