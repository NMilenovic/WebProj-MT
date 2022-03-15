using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ProjekatContext: DbContext
    {
        public DbSet<Album> Albumi { get; set; }
        public DbSet<Izdavac> Izdavaci { get; set; }
        public DbSet<Izvodjac> Izvodjaci { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }


        public ProjekatContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}