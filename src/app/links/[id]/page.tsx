import { notFound } from 'next/navigation';


import LinkForm from './LinkForm';
import { getCurrentUser } from '@/auth/auth';
import PleaseLoginFirst from '@/components/pleaseLoginFirst';
import { db } from '@/db';
import { dynamicLinks } from '@/db/schema/dynamicLink';
import { and, eq } from 'drizzle-orm';

export default async function LinkPage({ params }: { params: { id: string } }) {
  
  const user = await getCurrentUser();

  if (!user) {
    // Redirect to login or show an error
    return <PleaseLoginFirst />
  }

  let link = null;
  if (params.id !== 'new') {
    [link] = await db.select().from(dynamicLinks).where(
      and(
        eq(dynamicLinks.id, params.id),
        eq(dynamicLinks.createdBy, user.id)
      )
    ).limit(1);
    if (!link) {
      notFound();
    }
  }

  return <LinkForm initialData={JSON.parse(JSON.stringify(link))} />;
}