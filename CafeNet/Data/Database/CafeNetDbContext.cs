using CafeNet.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CafeNet.Data.Database
{
    public class CafeNetDbContext : DbContext
    {
        public DbSet<Credit> Credits { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<MenuItemVariation> MenuItemVariations { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderItemVariation> OrderItemVariations { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<StripeReader> StripeReaders { get; set; }
        public DbSet<Tax> Taxes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Receipt> Receipts { get; set; }

        public CafeNetDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            foreach (var entity in builder.Model.GetEntityTypes())
            {
                foreach (var property in entity.GetProperties())
                {
                    if (property.ClrType == typeof(decimal))
                    {
                        property.SetColumnType("decimal(18,2)");
                    }
                }
            }

            ApplyPostgresVersioning<Credit>(builder);
            ApplyPostgresVersioning<Discount>(builder);
            ApplyPostgresVersioning<Location>(builder);
            ApplyPostgresVersioning<MenuItem>(builder);
            ApplyPostgresVersioning<MenuItemVariation>(builder);
            ApplyPostgresVersioning<Order>(builder);
            ApplyPostgresVersioning<OrderItem>(builder);
            ApplyPostgresVersioning<OrderItemVariation>(builder);
            ApplyPostgresVersioning<Payment>(builder);
            ApplyPostgresVersioning<StripeReader>(builder);
            ApplyPostgresVersioning<Tax>(builder);
            ApplyPostgresVersioning<User>(builder);

            base.OnModelCreating(builder);
        }

        private static void ApplyPostgresVersioning<TEntity>(ModelBuilder builder) where TEntity : class
        {
            builder.Entity<TEntity>()
                .Property("Version")
                .IsRowVersion()
                .HasColumnName("xmin")
                .HasColumnType("xid")
                .ValueGeneratedOnAddOrUpdate()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}
