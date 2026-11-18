import { useMutation } from '@tanstack/react-query';
import attachmentService from '../service/attachment';

export const useUploadAttachment = () => {
  return useMutation({
    mutationKey: ['attachment-upload'],
    mutationFn: attachmentService.upload,
  });
};
