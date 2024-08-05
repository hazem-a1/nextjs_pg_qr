import { db } from '@/db';
import LinkRepository from '@/db/repositories/link.repository';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest, { params }: { params: { shortCode: string } }) {
  try {
    const { shortCode } = params;
    const LinkRepo = new LinkRepository(db);
    const link = await LinkRepo.findLinkByShortCode(shortCode);

    if (link?.targetUrl) {
      return NextResponse.redirect(link.targetUrl)
    } else {
      return NextResponse.json({ error: 'link not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching link' }, { status: 500 });
  }
}
