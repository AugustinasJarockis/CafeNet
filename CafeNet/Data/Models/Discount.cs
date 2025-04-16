﻿namespace CafeNet.Data.Models
{
    public class Discount
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public byte? Percent { get; set; }
        public decimal? Amount { get; set; }
    }
}
