import { db } from '@/db';
import { LinkList } from './LinkList';
import NeonButton from '@/components/NeonButtonLink';
import { getCurrentUser } from '@/auth/auth';
import PleaseLoginFirst from '@/components/pleaseLoginFirst';
import LinkRepository from '@/db/repositories/link.repository';

export default async function LinkListingPage() {
  
  const user = await getCurrentUser();

  if (!user) return <PleaseLoginFirst />
  
  const linksRepo = new LinkRepository(db);
  // this accept pagination for later usage
  const userLinks = await linksRepo.findByUserId(user.id);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold mb-3 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      Your Links
          </h1>
        <NeonButton href="/links/new">Create Link</NeonButton>
      </div>
      <LinkList initialLinks={JSON.parse(JSON.stringify(userLinks))} />
    </div>
  );
}