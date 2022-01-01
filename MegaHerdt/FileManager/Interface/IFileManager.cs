namespace MegaHerdt.API.FileManager.Interface
{
    public interface IFileManager
    {
        Task<string> EditFile(byte[] content, string extension, string container, string path,
            string contentType);
        Task DeleteFile(string path, string container);
        Task<string> SaveFile(byte[] content, string extension, string container, string contentType);
    }
}
