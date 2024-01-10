 using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;
using System;
using System.Reflection.Emit;

namespace pastebook_db.Database
{
    public class PastebookContext : DbContext
    {
        public PastebookContext() { }
        public PastebookContext(DbContextOptions<PastebookContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Friend> Friends { get; set; } = null!;
        public DbSet<FriendRequest> FriendRequests { get; set; } = null!;

        public DbSet<Album> Albums { get; set; } = null!;
        public DbSet<AlbumImage> AlbumImages { get; set; } = null!;
        public DbSet<AlbumImageComment> AlbumImageComments { get; set; } = null!;
        public DbSet<AlbumImageLike> AlbumImageLikes { get; set; } = null!;

        public DbSet<Post> Posts { get; set; } = null!;
        public DbSet<PostLike> PostLikes { get; set; } = null!;
        public DbSet<PostComment> PostComments { get; set; } = null!;

        public DbSet<Notification> Notifications { get; set; } = null!;

        public DbSet<UserToken> Tokens { get; set; } = null!;


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Change connection string here
                optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=pastebook_db;Integrated Security=True;Trust Server Certificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder mB)
        {
            mB.Entity<Friend>()
                .HasOne(a => a.User_Friend)
                .WithMany(a => a.FriendList)
                .HasForeignKey(a => a.User_FriendId)
                .OnDelete(DeleteBehavior.NoAction);

            mB.Entity<AlbumImageComment>()
                    .HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.ClientCascade);

            mB.Entity<AlbumImageLike>()
                    .HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.ClientCascade);

            mB.Entity<PostComment>()
                    .HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.ClientCascade);

            mB.Entity<PostLike>()
                    .HasOne(e => e.User)
                    .WithMany()
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.ClientCascade);

            mB.Entity<FriendRequest>()
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.ClientCascade);

            /*mB.Entity<Post>()
                .HasMany(e => e.PostCommentList)
                .WithOne()
                .HasForeignKey(e => e.PostId)
                .OnDelete(DeleteBehavior.ClientCascade);

            mB.Entity<AlbumImage>()
                .HasMany(e => e.AlbumImageLikesList)
                .WithOne()
                .HasForeignKey(e => e.AlbumImageId)
                .OnDelete(DeleteBehavior.ClientCascade);

            mB.Entity<AlbumImage>()
                .HasMany(e => e.AlbumImageCommentsList)
                .WithOne()
                .HasForeignKey(e => e.AlbumImageId)
                .OnDelete(DeleteBehavior.ClientCascade);*/
        }
    }
}
