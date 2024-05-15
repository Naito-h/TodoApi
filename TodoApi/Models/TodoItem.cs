namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
        public string? State { get; set; }
        public DateOnly Date { get; set; }
        public string? Detail { get; set; }
    }
}