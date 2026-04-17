import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes, NoteTag } from '@/lib/api'; 
import { Metadata } from 'next';

export async function generateMetadata({ params }: FilterPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tagParam = resolvedParams.slug?.[0] || 'all';
  
  const displayTag = tagParam.charAt(0).toUpperCase() + tagParam.slice(1);
  const title = `${displayTag} Notes | NoteHub`;
  const description = `Перегляд нотаток у категорії "${displayTag}". Керуйте своїми справами ефективно з NoteHub.`;
  const url = `https://notehub-yana.vercel.app/notes/filter/${tagParam}`;

 return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub - ${displayTag} notes`,
        },
      ],
      locale: 'uk_UA',
      type: 'website',
    },
  };
}

interface FilterPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage({ params }: FilterPageProps) {
  const resolvedParams = await params;
  const tagParam = resolvedParams.slug?.[0] as NoteTag;
  const activeTag = tagParam === 'all' ? undefined : tagParam;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', activeTag],
    queryFn: () => fetchNotes({ tag: activeTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={activeTag} tag={activeTag} />
    </HydrationBoundary>
  );
}