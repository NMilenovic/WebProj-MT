using Microsoft.EntityFrameworkCore.Migrations;

namespace MT.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Izdavaci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Izdavaci", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Izvodjaci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Izvodjaci", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Izvodjaci_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Albumi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Zanr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GodinaIzdanja = table.Column<int>(type: "int", nullable: false),
                    IzvodjacID = table.Column<int>(type: "int", nullable: true),
                    IzdavacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Albumi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Albumi_Izdavaci_IzdavacID",
                        column: x => x.IzdavacID,
                        principalTable: "Izdavaci",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Albumi_Izvodjaci_IzvodjacID",
                        column: x => x.IzvodjacID,
                        principalTable: "Izvodjaci",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Albumi_IzdavacID",
                table: "Albumi",
                column: "IzdavacID");

            migrationBuilder.CreateIndex(
                name: "IX_Albumi_IzvodjacID",
                table: "Albumi",
                column: "IzvodjacID");

            migrationBuilder.CreateIndex(
                name: "IX_Izvodjaci_KorisnikID",
                table: "Izvodjaci",
                column: "KorisnikID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Albumi");

            migrationBuilder.DropTable(
                name: "Izdavaci");

            migrationBuilder.DropTable(
                name: "Izvodjaci");

            migrationBuilder.DropTable(
                name: "Korisnici");
        }
    }
}
