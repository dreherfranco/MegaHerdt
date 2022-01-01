using MegaHerdt.API.FileManager.Interface;

namespace MegaHerdt.API.FileManager
{
    public class LocalFileManager: IFileManager
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccessor;

        public LocalFileManager(IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccessor)
        {
            this.env = env;
            this.httpContextAccessor = httpContextAccessor;
        }

        public Task DeleteFile(string path, string container)
        {
            if (path != null)
            {
                var fileName = Path.GetFileName(path);
                string fileDir = Path.Combine(env.WebRootPath, container, fileName);

                if (File.Exists(fileDir))
                {
                    File.Delete(fileDir);
                }
            }

            return Task.FromResult(0);

        }

        public async Task<string> EditFile(byte[] content, string extension, string container, string path,
            string contentType)
        {
            await DeleteFile(path, container);
            return await SaveFile(content, extension, container, contentType);
        }

        public async Task<string> SaveFile(byte[] content, string extension, string container,
            string contentType)
        {
            var fileName = $"{Guid.NewGuid()}{extension}";

            if (string.IsNullOrWhiteSpace(env.WebRootPath))
            {
                env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            }

            string folder = Path.Combine(env.WebRootPath, container);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string path = Path.Combine(folder, fileName);
            await File.WriteAllBytesAsync(path, content);

            var actualUrl = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
            var urlForDB = Path.Combine(actualUrl, container, fileName).Replace("\\", "/");
            return urlForDB;
        }
    }
}
