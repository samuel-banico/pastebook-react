using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.DotNet.Scaffolding.Shared.ProjectModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using pastebook_db.Data;
using pastebook_db.Database;
using pastebook_db.Services.PasswordHash;
using pastebook_db.Services.Token;
using pastebook_db.Services.Token.TokenData;
using pastebook_db.Services.Token.TokenGenerator;
using pastebook_db.Services.Token.TokenValidator;
using System.Text;
using System.Text.Json.Serialization;

namespace pastebook_db
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<PastebookContext>(options =>
               options.UseSqlServer(builder.Configuration.GetConnectionString("PastebookContext") ?? throw new InvalidOperationException("Connection string 'PastebookContext' not found."), sqlServerOptionsAction: sqlOptions => 
                {
                    sqlOptions.EnableRetryOnFailure(maxRetryCount: 10, maxRetryDelay: TimeSpan.FromSeconds(30), errorNumbersToAdd: null);
                }));

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            AuthenticationConfiguration authenticationConfiguration = new AuthenticationConfiguration();

            builder.Configuration.Bind("Authentication", authenticationConfiguration);
            builder.Services.AddSingleton(authenticationConfiguration);

            builder.Services.AddSingleton<IPasswordHash, PasswordHasher>();
            builder.Services.AddSingleton<GenerateAccessToken>();
            builder.Services.AddSingleton<GenerateToken>();

            builder.Services.AddScoped<TokenController>();
            builder.Services.AddScoped<TokenRepository>();
            builder.Services.AddScoped<ValidateToken>();
            builder.Services.AddScoped<AccessRepository>();
            builder.Services.AddScoped<AlbumImageCommentRepository>();
            builder.Services.AddScoped<AlbumImageLikeRepository>();
            builder.Services.AddScoped<AlbumImageRepository>();
            builder.Services.AddScoped<AlbumRepository>();
            builder.Services.AddScoped<FriendRepository>();
            builder.Services.AddScoped<FriendRequestRepository>();
            builder.Services.AddScoped<HomeRepository>();
            builder.Services.AddScoped<NotificationRepository>();
            builder.Services.AddScoped<PostCommentRepository>();
            builder.Services.AddScoped<PostLikeRepository>();
            builder.Services.AddScoped<PostRepository>();
            builder.Services.AddScoped<UserRepository>();
            
            builder.Services.AddCors();
            //Added to ignore circular reference
            builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationConfiguration.AccessTokenSecret)),
                    ValidIssuer = authenticationConfiguration.Issuer,
                    ValidAudience = authenticationConfiguration.Audience,
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            var app = builder.Build();

            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
            );

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            SeedData.SeedDatabase(app.Services.CreateScope().ServiceProvider.GetRequiredService<PastebookContext>());

            app.UseSwagger();
            app.UseSwaggerUI();

            app.Run();
        }
    }
}