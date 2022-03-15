using Microsoft.EntityFrameworkCore.Migrations;

namespace MT.Migrations
{
    public partial class v4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KorisnikID",
                table: "Albumi",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Albumi_KorisnikID",
                table: "Albumi",
                column: "KorisnikID");

            migrationBuilder.AddForeignKey(
                name: "FK_Albumi_Korisnici_KorisnikID",
                table: "Albumi",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albumi_Korisnici_KorisnikID",
                table: "Albumi");

            migrationBuilder.DropIndex(
                name: "IX_Albumi_KorisnikID",
                table: "Albumi");

            migrationBuilder.DropColumn(
                name: "KorisnikID",
                table: "Albumi");
        }
    }
}
