﻿using CafeNet.Data.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeNet.Data.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public UserRoles Role { get; set; }
        public string? PhoneNumber { get; set; }
        public long? LocationId { get; set; }

        public ICollection<Order> Orders { get; set; }

        // for foreign keys
        public Location Location { get; set; }
        public Credit Credit { get; set; }

        // Optimistic concurrency token
        [NotMapped]
        public uint Version { get; set; }
    }
}
