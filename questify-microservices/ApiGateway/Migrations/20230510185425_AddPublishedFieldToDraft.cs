using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ApiGateway.Migrations
{
    /// <inheritdoc />
    public partial class AddPublishedFieldToDraft : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Drafts");

            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Drafts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Published",
                table: "Drafts",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "DraftFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FileUrl = table.Column<string>(type: "text", nullable: false),
                    DraftId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DraftFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DraftFiles_Drafts_DraftId",
                        column: x => x.DraftId,
                        principalTable: "Drafts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drafts_AuthorId",
                table: "Drafts",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_DraftFiles_DraftId",
                table: "DraftFiles",
                column: "DraftId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drafts_Users_AuthorId",
                table: "Drafts",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drafts_Users_AuthorId",
                table: "Drafts");

            migrationBuilder.DropTable(
                name: "DraftFiles");

            migrationBuilder.DropIndex(
                name: "IX_Drafts_AuthorId",
                table: "Drafts");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Drafts");

            migrationBuilder.DropColumn(
                name: "Published",
                table: "Drafts");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Drafts",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
