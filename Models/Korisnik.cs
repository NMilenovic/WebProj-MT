using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Korisnik 
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50)]
        [Required]
        public string Username { get; set; }

        [JsonIgnore]
        public List<Izvodjac> Izvodjaci { get; set; }
        [JsonIgnore]
        public List<Izdavac> Izdavaci {get;set;}
        
        [JsonIgnore]
        public List<Album> Albumi {get;set;}
        
    }
}