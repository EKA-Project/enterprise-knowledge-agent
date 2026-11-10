import { useEffect, useState } from 'react';
// Adjust the path if useConversationCounts.js and the chat folder are laid out differently.
import { listConversations, subscribe } from '../components/chat/chatApi';

// Active / archived counts for the Topbar subtitle on the Chat History route.
export default function useConversationCounts() {
  const [counts, setCounts] = useState({ active: 0, archived: 0 });

  useEffect(() => {
    let alive = true;
    const sync = async () => {
      try {
        const list = await listConversations();
        if (!alive) return;
        const archived = list.filter((c) => c.archived).length;
        setCounts({ active: list.length - archived, archived });
      } catch {
        /* keep the last counts */
      }
    };
    sync();
    const off = subscribe(sync);
    return () => {
      alive = false;
      off();
    };
  }, []);

  return counts;
}