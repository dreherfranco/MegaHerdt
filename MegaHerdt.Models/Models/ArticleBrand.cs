﻿using System.ComponentModel.DataAnnotations;

namespace MegaHerdt.Models.Models
{
    public class ArticleBrand
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Article> Articles { get; set; }
    }
}