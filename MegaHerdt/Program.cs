using MegaHerdt.API.ExtensionMethods;
using MegaHerdt.Helpers.Helpers;
using MegaHerdt.Models.Models.Identity;
using MegaHerdt.Repository.Base;
using MegaHerdt.Services.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
IoC.SwaggerInjection(builder);

//DEPENDENCY INJECTION
IoC.DbConfiguration(builder);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
IoC.HelpersInjection(builder);
IoC.ServicesInjection(builder);
IoC.RepositoryInjection(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
