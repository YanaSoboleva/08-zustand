'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NoteModalPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const onDismiss = () => {
    router.back();
  };

  return (
    <Modal onClose={onDismiss}>
      <NoteDetailsClient id={id} />
    </Modal>
  );
}