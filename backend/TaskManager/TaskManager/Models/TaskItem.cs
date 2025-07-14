﻿using System.ComponentModel.DataAnnotations;
using System;

namespace TaskManager.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? CompletedAt { get; set; }

        public int Priority { get; set; }
    }
}
