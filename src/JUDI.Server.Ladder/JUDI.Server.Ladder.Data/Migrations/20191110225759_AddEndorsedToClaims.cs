using Microsoft.EntityFrameworkCore.Migrations;

namespace JUDI.Server.Ladder.Data.Migrations
{
    public partial class AddEndorsedToClaims : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClaimMessages_Claims_ClaimId",
                table: "ClaimMessages");

            migrationBuilder.AddColumn<bool>(
                name: "Endorsed",
                table: "Claims",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "ClaimId",
                table: "ClaimMessages",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ClaimMessages_Claims_ClaimId",
                table: "ClaimMessages",
                column: "ClaimId",
                principalTable: "Claims",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClaimMessages_Claims_ClaimId",
                table: "ClaimMessages");

            migrationBuilder.DropColumn(
                name: "Endorsed",
                table: "Claims");

            migrationBuilder.AlterColumn<int>(
                name: "ClaimId",
                table: "ClaimMessages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_ClaimMessages_Claims_ClaimId",
                table: "ClaimMessages",
                column: "ClaimId",
                principalTable: "Claims",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
