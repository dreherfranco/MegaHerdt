using MegaHerdt.API.ExtensionMethods;
using MegaHerdt.API.FileManager;
using MegaHerdt.API.FileManager.Interface;
using MegaHerdt.Models.Models;
using MegaHerdt.Services.Services;
using MegaHerdt.Services.Services.Interfaces;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
IoC.SwaggerInjection(builder);

//DEPENDENCY INJECTION
IoC.DbConfiguration(builder);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddTransient<IFileManager, LocalFileManager>();
builder.Services.AddHttpContextAccessor();
IoC.HelpersInjection(builder);
IoC.ServicesInjection(builder);
IoC.RepositoryInjection(builder);

//MAILER DEPENDENCY INJECTION
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddTransient<IMailerService, MailerService>();
StripeConfiguration.ApiKey = builder.Configuration.GetSection("Stripe")["apiKey"];

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x=>x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
