import useSWR from 'swr';
import chatApi from './chatApi';
import moodApi from './moodApi';
import { MoodType } from './types';

export interface FormattedMessage {
  from: 'me' | 'tala';
  text: string;
  time: string;
  mood?: MoodType;
  date: string;
}

export interface ChatData {
  chatLogs: FormattedMessage[];
  userMood: MoodType | null;
  isNewUser: boolean;
}

export async function fetchChatData(): Promise<ChatData> {
  try {
    const [chatLogs, moodEntries] = await Promise.all([
      chatApi.getChatLogs(),
      moodApi.getMoodEntries()
    ]);

    // Sort chat logs by timestamp ascending (oldest to newest)
    const sortedChatLogs = (chatLogs || []).slice().sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // Sort mood entries by timestamp ascending
    const sortedMoods = (moodEntries || []).slice().sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // For each user message, find the closest mood entry within +/- 15 seconds of the message timestamp
    const formattedLogs = sortedChatLogs.map(log => {
      if (!log.timestamp) return {
        from: log.from === 'user' ? 'me' as const : 'tala' as const,
        text: log.content,
        time: '',
        mood: log.mood,
        date: '',
      };
      let matchedMood: MoodType | undefined = undefined;
      if (log.from === 'user') {
        const msgTime = new Date(log.timestamp).getTime();
        let closestMood: { mood: MoodType; diff: number } | undefined = undefined;
        for (let i = 0; i < sortedMoods.length; i++) {
          const moodTime = new Date(sortedMoods[i].timestamp).getTime();
          const diff = Math.abs(moodTime - msgTime);
          if (diff <= 15000) { // 15 seconds window
            if (!closestMood || diff < closestMood.diff) {
              closestMood = { mood: sortedMoods[i].mood, diff };
            }
          }
        }
        if (closestMood) {
          matchedMood = closestMood.mood;
        }
      }
      // Debug log for mood pairing
      if (log.from === 'user') {
        console.log('[chatData] User message:', log.content, '| Timestamp:', log.timestamp, '| Matched mood:', matchedMood);
      }
      const dateObj = new Date(log.timestamp);
      const localTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const localDate = dateObj.toLocaleDateString('en-CA');
      return {
        from: log.from === 'user' ? 'me' as const : 'tala' as const,
        text: log.content,
        time: localTime,
        mood: matchedMood ?? log.mood,
        date: localDate,
      };
    });

    // Find the most recent mood
    const userMood = moodEntries?.length
      ? moodEntries.reduce((latest, current) =>
          new Date(latest.timestamp) > new Date(current.timestamp) ? latest : current
        ).mood
      : null;

    return {
      chatLogs: formattedLogs,
      userMood,
      isNewUser: !chatLogs?.length
    };
  } catch (error) {
    console.error("Error fetching chat data:", error);
    throw new Error("Failed to load chat data");
  }
}

export function useChatData() {
  const { data, error, isLoading, mutate } = useSWR<ChatData>(
    'chat-data',
    fetchChatData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000
    }
  );

  return {
    chatData: data,
    isLoading,
    isError: error,
    mutate
  };
} 