using CloudinaryDotNet.Actions;

namespace ecommerce.server.Interfaces
{
    public interface IMediaService
    {
        Task<ImageUploadResult> UploadImageAsync(IFormFile Image);
        //Task<VideoUploadResult> UploadVideoAsync(IFormFile Image);

        DeletionResult DeleteMedia(string publicId);
    }
}
