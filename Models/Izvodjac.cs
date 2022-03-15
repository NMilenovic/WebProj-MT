using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models 
{
    public class Izvodjac
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50)]
        [Required]
        public string Naziv { get; set; }

        public Korisnik Korisnik { get; set; }
        [JsonIgnore]
        public List<Album> ALbumi { get; set; }
    }
}