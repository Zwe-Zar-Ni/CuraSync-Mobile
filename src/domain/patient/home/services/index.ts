import { httpClient } from '@/common/api/apiClient';
import { Doctor, Specialization } from '../types';
import { PaginatedResponse } from '@/common/types';

class HomeService {
  async getSpecializations() {
    const response = await httpClient.get<Specialization[]>(
      '/public/specializations',
    );
    return response.data;
  }

  async getDoctors(specializationId?: number) {
    const response = await httpClient.get<PaginatedResponse<Doctor>>(
      '/public/doctors',
      {
        params: {
          specialization_id: specializationId,
        },
      },
    );
    return response.data;
  }
}

const homeService = new HomeService();

export default homeService;
