import { httpClient } from '../api/apiClient';
import { Doctor, Patient, Specialization } from '../types';

class CommonService {
  async getProfile() {
    const response = await httpClient.get<Doctor | Patient>('/me');
    return response.data;
  }

  async getSpecializations() {
    const response = await httpClient.get<Specialization[]>(
      '/public/specializations',
    );
    return response.data;
  }
}

const commonService = new CommonService();
export default commonService;
