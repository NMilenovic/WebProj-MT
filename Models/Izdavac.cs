using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Izdavac
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50)]
        public string Naziv { get; set; }

        [JsonIgnore]
        public List<Album> Albumi { get; set; }
        public Korisnik Korisnik { get; set; }

    }
}