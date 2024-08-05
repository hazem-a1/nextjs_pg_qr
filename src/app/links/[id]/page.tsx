import { notFound } from 'next/navigation';
import LinkForm from './LinkForm';
import { getCurrentUser } from '@/auth/auth';
import PleaseLoginFirst from '@/components/pleaseLoginFirst';
import { db } from '@/db';
import LinkRepository from '@/db/repositories/link.repository';

export default async function LinkPage({ params }: { params: { id: string } }) {
  
  const user = await getCurrentUser();

  if (!user) {
    // Redirect to login or show an error
    return <PleaseLoginFirst />
  }

  let link = null;
  if (params.id !== 'new') {

    const LinkRepo = new LinkRepository(db);
    link = await LinkRepo.findUserLink(params.id,user.id);

    if (!link) {
      notFound();
    }
  }

  return <LinkForm initialData={JSON.parse(JSON.stringify(link))} />;
}