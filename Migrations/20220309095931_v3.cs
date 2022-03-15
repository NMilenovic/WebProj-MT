using Microsoft.EntityFrameworkCore.Migrations;

namespace MT.Migrations
{
    public partial class v3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KorisnikID",
                table: "Izdavaci",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Izdavaci_KorisnikID",
                table: "Izdavaci",
                column: "KorisnikID");

            migrationBuilder.AddForeignKey(
                name: "FK_Izdavaci_Korisnici_KorisnikID",
                table: "Izdavaci",
                column: "KorisnikID",
                principalTable: "Korisnici",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Izdavaci_Korisnici_KorisnikID",
                table: "Izdavaci");

            migrationBuilder.DropIndex(
                name: "IX_Izdavaci_KorisnikID",
                table: "Izdavaci");

            migrationBuilder.DropColumn(
                name: "KorisnikID",
                table: "Izdavaci");
        }
    }
}
