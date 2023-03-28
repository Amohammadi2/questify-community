using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiGateway.Migrations
{
    /// <inheritdoc />
    public partial class AddIsPrivateFieldToCommunity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_communities_Users_OwnerId",
                table: "communities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_communities",
                table: "communities");

            migrationBuilder.RenameTable(
                name: "communities",
                newName: "Communities");

            migrationBuilder.RenameIndex(
                name: "IX_communities_OwnerId",
                table: "Communities",
                newName: "IX_Communities_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_communities_Name",
                table: "Communities",
                newName: "IX_Communities_Name");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Communities",
                type: "character varying(512)",
                maxLength: 512,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<bool>(
                name: "IsPrivate",
                table: "Communities",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Communities",
                table: "Communities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Communities_Users_OwnerId",
                table: "Communities",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Communities_Users_OwnerId",
                table: "Communities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Communities",
                table: "Communities");

            migrationBuilder.DropColumn(
                name: "IsPrivate",
                table: "Communities");

            migrationBuilder.RenameTable(
                name: "Communities",
                newName: "communities");

            migrationBuilder.RenameIndex(
                name: "IX_Communities_OwnerId",
                table: "communities",
                newName: "IX_communities_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Communities_Name",
                table: "communities",
                newName: "IX_communities_Name");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "communities",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(512)",
                oldMaxLength: 512);

            migrationBuilder.AddPrimaryKey(
                name: "PK_communities",
                table: "communities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_communities_Users_OwnerId",
                table: "communities",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
