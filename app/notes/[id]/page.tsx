// import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import { fetchNoteById } from '@/lib/api';
// import NoteDetailsClient from './NoteDetails.client';

// export default async function NoteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
//   const queryClient = new QueryClient();
//   const { id } = await params;


//   await queryClient.prefetchQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNoteById(id),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NoteDetailsClient id={id} />
//     </HydrationBoundary>
//   );
// }

import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client'; 

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await fetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    const description = note.content ? note.content.slice(0, 150) + '...' : 'Перегляд деталей нотатки в NoteHub';
    const url = `https://notehub-yana.vercel.app/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: 'NoteHub',
        type: 'article',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Note Details | NoteHub',
      description: 'Детальна інформація про нотатку',
    };
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}