using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace JUDI.Server.Ladder.Data.Migrations
{
    public partial class AddMessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndorsementEvidence",
                table: "Endorsements");

            migrationBuilder.AddColumn<int>(
                name: "MessageId",
                table: "Endorsements",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(nullable: true),
                    AuthorUsername = table.Column<string>(nullable: true),
                    WrittenOnDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ClaimMessages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MessageId = table.Column<int>(nullable: true),
                    ClaimId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClaimMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClaimMessages_Claims_ClaimId",
                        column: x => x.ClaimId,
                        principalTable: "Claims",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClaimMessages_Messages_MessageId",
                        column: x => x.MessageId,
                        principalTable: "Messages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Endorsements_MessageId",
                table: "Endorsements",
                column: "MessageId");

            migrationBuilder.CreateIndex(
                name: "IX_ClaimMessages_ClaimId",
                table: "ClaimMessages",
                column: "ClaimId");

            migrationBuilder.CreateIndex(
                name: "IX_ClaimMessages_MessageId",
                table: "ClaimMessages",
                column: "MessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Endorsements_Messages_MessageId",
                table: "Endorsements",
                column: "MessageId",
                principalTable: "Messages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Endorsements_Messages_MessageId",
                table: "Endorsements");

            migrationBuilder.DropTable(
                name: "ClaimMessages");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Endorsements_MessageId",
                table: "Endorsements");

            migrationBuilder.DropColumn(
                name: "MessageId",
                table: "Endorsements");

            migrationBuilder.AddColumn<string>(
                name: "EndorsementEvidence",
                table: "Endorsements",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
