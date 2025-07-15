using System.ComponentModel.DataAnnotations;
using System;

namespace TaskManager.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } 

        [StringLength(1000)]
        public string Description { get; set; } 

        [Range(1, 3)]
        public int Priority { get; set; }
    }
}
