using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Album
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50)]
        [Required]
        public string Naziv { get; set; }

        public string Zanr { get; set; }

        [Range(1950,2022)]
        public int GodinaIzdanja { get; set; }

        public Izvodjac Izvodjac { get; set; }

        public Izdavac Izdavac { get; set; }

        [JsonIgnore]
        public Korisnik Korisnik {get;set;}
    }
}