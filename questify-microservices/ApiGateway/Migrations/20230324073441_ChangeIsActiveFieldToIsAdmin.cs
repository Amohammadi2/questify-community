using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiGateway.Migrations
{
    /// <inheritdoc />
    public partial class ChangeIsActiveFieldToIsAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isActive",
                table: "Users",
                newName: "isAdmin");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAdmin",
                table: "Users",
                newName: "isActive");
        }
    }
}
