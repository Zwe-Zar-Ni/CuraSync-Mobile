import { View, Text } from 'react-native';
import { DAY_KEYS, ScheduleRequest } from '../types';
import { useTranslation } from 'react-i18next';
import { Clock, Info, Timer } from 'lucide-react-native';
import useTheme from '@/common/hooks/useTheme';

const StatusBadge = ({ status }: { status: ScheduleRequest['status'] }) => {
  let backgroundColor = '';
  let textColor = '';

  switch (status) {
    case 'PENDING':
      backgroundColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'APPROVED':
      backgroundColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'REJECTED':
      backgroundColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      backgroundColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <View className={`px-2 py-1 rounded-full ${backgroundColor}`}>
      <Text className={`text-xs font-medium ${textColor}`}>{status}</Text>
    </View>
  );
};

const RequestTypeBadge = ({
  requestType,
}: {
  requestType: ScheduleRequest['request_type'];
}) => {
  let backgroundColor = '';
  let textColor = '';

  switch (requestType) {
    case 'CREATE':
      backgroundColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'UPDATE':
      backgroundColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'DELETE':
      backgroundColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      backgroundColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }

  return (
    <View className={`px-2 py-1 rounded-full ${backgroundColor}`}>
      <Text className={`text-xs font-medium ${textColor}`}>{requestType}</Text>
    </View>
  );
};

type Props = {
  request: ScheduleRequest;
};

const ScheduleRequestCard = ({ request }: Props) => {
  const { t } = useTranslation();
  const { text } = useTheme();

  const data = request.doctor_schedule ? request.doctor_schedule : request.data;

  return (
    <View className="bg-surface rounded-xl border border-border p-4">
      <View className="flex-row items-center gap-3">
        <View className="flex-1">
          <Text className="text-md font-medium text-text-primary">
            {t(DAY_KEYS[data.day_of_week])}
          </Text>
          <View className="flex-row items-center gap-2 mt-1">
            <Clock color={text.secondary} size={16} />
            <Text className="text-sm text-text-secondary">
              {data.start_time.slice(0, 5)} – {data.end_time.slice(0, 5)}
            </Text>
          </View>
        </View>
        <RequestTypeBadge requestType={request.request_type} />
        <StatusBadge status={request.status} />
      </View>
      <View className="flex-row items-center gap-2 my-3">
        <View className="flex-row items-center gap-1 border border-border rounded-full px-2 py-0.5">
          <Timer color={text.secondary} size={12} />
          <Text className="text-xs text-text-secondary">
            {t('schedules.minutesValue', {
              value: data.slot_duration_minutes,
            })}
          </Text>
        </View>
      </View>
      {request.reviewed_at && request.admin_note ? (
        <View className="flex-row gap-1 items-start">
          <Info size={16} color={text.secondary} />
          <Text className="text-text-secondary text-sm flex-1">
            {request.admin_note}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default ScheduleRequestCard;
