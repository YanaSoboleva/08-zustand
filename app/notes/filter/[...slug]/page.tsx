import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes, NoteTag } from '@/lib/api'; 

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
      <NotesClient key={activeTag} initialTag={activeTag} />
    </HydrationBoundary>
  );
}