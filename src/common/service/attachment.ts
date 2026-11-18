import { httpClient } from '../api/apiClient';
import { Attachment } from '../types/attachment';

class AttachmentService {
  async upload(formData: FormData) {
    const response = await httpClient.post('/attachments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as Attachment;
  }
}

const attachmentService = new AttachmentService();
export default attachmentService;
