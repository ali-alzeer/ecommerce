using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using ecommerce.server.Interfaces;

namespace ecommerce.server.Services
{
    public class MediaService : IMediaService
    {
        private readonly Cloudinary cloudinary;

        public MediaService(IConfiguration configuration)
        {

            Account account = new Account(
                configuration.GetSection("Cloudinary:CloudName").Value,
                configuration.GetSection("Cloudinary:ApiKey").Value,
                configuration.GetSection("Cloudinary:ApiSecret").Value
            );

            cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> UploadImageAsync(IFormFile Image)
        {
            var uploadResult = new ImageUploadResult();
            if (Image.Length > 0)
            {
                using var stream = Image.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(Image.FileName, stream),
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        //public async Task<VideoUploadResult> UploadVideoAsync(IFormFile Video)
        //{
        //    var uploadResult = new VideoUploadResult();
        //    if (Video.Length > 0)
        //    {
        //        using var stream = Video.OpenReadStream();
        //        var uploadParams = new VideoUploadParams
        //        {
        //            File = new FileDescription(Video.FileName, stream),
        //        };
        //        uploadResult = await cloudinary.UploadAsync(uploadParams);
        //    }
        //    return uploadResult;
        //}

        public DeletionResult DeleteMedia(string publicId)
        {
            var deletionParams = new DeletionParams(publicId);

            var destroyResult = cloudinary.Destroy(deletionParams);

            return destroyResult;
        }
    }
}
