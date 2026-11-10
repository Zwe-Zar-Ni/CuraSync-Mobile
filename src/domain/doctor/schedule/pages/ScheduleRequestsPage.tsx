import { View, Text, Pressable } from 'react-native';
import { useGetScheduleRequests } from '../queries/schedule';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CalendarX, ChevronLeft } from 'lucide-react-native';
import useTheme from '@/common/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import ScheduleRequestCard from '../components/ScheduleRequestCard';

const ScheduleRequestsPage = () => {
  const insets = useSafeAreaInsets();
  const { text } = useTheme();
  const { t } = useTranslation();

  const { data: scheduleRequests } = useGetScheduleRequests();

  return (
    <View
      className="flex-1 bg-background px-3"
      style={{ paddingTop: insets.top + 16 }}
    >
      <View className="mb-4">
        {router.canGoBack() ? (
          <Pressable onPress={() => router.back()} className="mb-4">
            <ChevronLeft color={text.secondary} size={24} />
          </Pressable>
        ) : null}
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-2xl leading-10 font-medium text-text-primary">
              {t('schedules.requests_title')}
            </Text>
            <Text className="font-medium text-text-secondary">
              {t('schedules.requests_subtitle')}
            </Text>
          </View>
        </View>
      </View>
      <FlashList
        data={scheduleRequests ?? []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ScheduleRequestCard request={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <View className="items-center gap-2 mt-20">
            <CalendarX color={text.secondary} size={40} />
            <Text className="text-md font-medium text-text-primary">
              {t('schedules.empty')}
            </Text>
            <Text className="text-sm text-text-secondary text-center">
              {t('schedules.emptyHint')}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default ScheduleRequestsPage;
