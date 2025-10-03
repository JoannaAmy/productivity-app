'use client';

import { useRouter } from 'next/navigation';

export default function PlanModal() {
  const router = useRouter();

  const closeModal = () => {
    router.push('/');
  };

  return (
    <div className="modal">
      <button onClick={closeModal}>╳</button>
      <h2>Create Event</h2>
      {/* Modal content here */}
    </div>
  );
}