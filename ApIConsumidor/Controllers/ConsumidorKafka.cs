using ApIConsumidor.Model.DTO;
using Confluent.Kafka;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Numerics;
using System.Text.RegularExpressions;

namespace ApIConsumidor.Controllers
{
    [ApiController]
    [Route("/")]

    public class ConsumidorKafka : ControllerBase
    {

        private readonly ILogger<ConsumidorKafka> _logger;

        public ConsumidorKafka(ILogger<ConsumidorKafka> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public void ConsumirKafka()
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = "kafka:9092", // Cambia esto al servidor y puerto de tu clúster Kafka
                GroupId = "my-consumer-group",
                AutoOffsetReset = AutoOffsetReset.Earliest, // Puedes configurar esto como "Latest" si deseas leer solo los nuevos eventos
            };

            using (var consumer = new ConsumerBuilder<Ignore, string>(config).Build())
            {
                consumer.Subscribe("test-topic"); // Cambia esto al nombre de tu tópico Kafka

                CancellationTokenSource cts = new CancellationTokenSource();
                Console.CancelKeyPress += (_, e) =>
                {
                    e.Cancel = true; // Evita que la aplicación se cierre inmediatamente en Ctrl+C
                    cts.Cancel();
                };

                try
                {
                    //while (true)
                    //{
                    var result = consumer.Consume(cts.Token);
                    _logger.LogInformation(result.Message.Value);
                    Console.WriteLine($"Consumido mensaje: {result.Message.Value}");
                    //}
                }
                catch (OperationCanceledException)
                {
                    // Ctrl+C fue presionado
                }
                finally
                {
                    consumer.Close();
                }
            }
            string message = "Good";

        }

        [HttpPost("logs")]
        public IActionResult GetLogs([FromBody] LogsDTO logs)
        {
            string logContent = "";
            List<string> listacontenido = new();
            int contador = 1;
            for (DateTime fechaActual = logs.FechaInicial; fechaActual <= logs.FechaFinal; fechaActual = fechaActual.AddDays(1))
            {
                try
                {
                    string fechainicial = logs.FechaInicial.ToString("yyyyMMdd");
                    string fechaFinal = logs.FechaFinal.ToString("yyyyMMdd");
                    logContent = System.IO.File.ReadAllText($"log/appLogs{fechaActual.ToString("yyyyMMdd")}.txt").ToString();
                    //listacontenido.Add();
                    listacontenido = validarLog(logContent, logs.tipolog);
                    contador++;
                    if(contador == logs.paginacion)
                    {
                        break;
                    }
                }
                catch (Exception ex)
                {

                }

            }

            return Ok(new { contenido = listacontenido });
        }

        [HttpPost("createlog")]
        public IActionResult CreateLog([FromBody] CreateLogDTO createlog)
        {
            if(createlog.tipo.Equals("INF"))
            {
                _logger.LogInformation(createlog.log);
            }
            else if(createlog.tipo.Equals("WRN"))
            {
                _logger.LogWarning(createlog.log);
            }
            else
            {
                _logger.LogError(createlog.log);
            }

            return Ok(createlog);
        }

        private List<string> validarLog(string logContent, string tipolog)
        {
            string pattern = @$"\[{tipolog}\]"; // Expresión regular para capturar el texto dentro de los corchetes [INF]
            MatchCollection matches = Regex.Matches(logContent, pattern);
            string infoLine = "";
            List<string> result = new();
            foreach (Match match in matches)
            {
                infoLine = GetLogLineContainingMatch(logContent, match.Index);
                Console.WriteLine(infoLine);
                result.Add(infoLine);
            }

            return result;
        }

        private string GetLogLineContainingMatch(string logContent, int matchIndex)
        {
            int startIndex = logContent.LastIndexOf(Environment.NewLine, matchIndex) + 1;
            int endIndex = logContent.IndexOf(Environment.NewLine, matchIndex);
            if (endIndex == -1)
            {
                endIndex = logContent.Length;
            }

            return logContent.Substring(startIndex, endIndex - startIndex);
        }


    }
}
