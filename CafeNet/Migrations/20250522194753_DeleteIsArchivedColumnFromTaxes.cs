using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CafeNet.Migrations
{
    /// <inheritdoc />
    public partial class DeleteIsArchivedColumnFromTaxes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsArchived",
                table: "Taxes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                table: "Taxes",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
