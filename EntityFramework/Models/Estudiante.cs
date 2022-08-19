using System;
using System.Collections.Generic;

namespace EntityFramework
{
    public partial class Estudiante
    {
        public long EstudianteId { get; set; }
        public string Nombre { get; set; } = null!;
        public string PrimerApellido { get; set; } = null!;
        public string? SegundoApellido { get; set; }
        public int Edad { get; set; }
    }
}
