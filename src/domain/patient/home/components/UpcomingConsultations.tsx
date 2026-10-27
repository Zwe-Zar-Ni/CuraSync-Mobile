import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import type { Consultation } from '../types';
import UpcomingConsultation from './UpcomingConsultation';

type Props = {
  consultations: Consultation[];
};

const UpcomingConsultations = ({ consultations }: Props) => {
  const { t } = useTranslation();

  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center gap-4">
        <Text className="text-text-primary text-xl font-semibold">
          {t('home.upcomingConsultations')}
        </Text>
        <Link href="/patient/profile">
          <Text className="text-primary font-medium">{t('home.seeAll')}</Text>
        </Link>
      </View>
      <View className="mt-2">
        {consultations && consultations.length ? (
          <UpcomingConsultation consultation={consultations[0]} />
        ) : (
          0
        )}
      </View>
    </View>
  );
};

export default UpcomingConsultations;
