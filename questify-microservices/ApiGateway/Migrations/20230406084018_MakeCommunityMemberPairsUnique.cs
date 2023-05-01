using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiGateway.Migrations
{
    /// <inheritdoc />
    public partial class MakeCommunityMemberPairsUnique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CommunityMemberships_CommunityId",
                table: "CommunityMemberships");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityMemberships_CommunityId_MemberId",
                table: "CommunityMemberships",
                columns: new[] { "CommunityId", "MemberId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CommunityMemberships_CommunityId_MemberId",
                table: "CommunityMemberships");

            migrationBuilder.CreateIndex(
                name: "IX_CommunityMemberships_CommunityId",
                table: "CommunityMemberships",
                column: "CommunityId");
        }
    }
}
