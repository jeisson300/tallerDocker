using Confluent.Kafka;
using Microsoft.AspNetCore.Mvc;

namespace ApIConsumidor.Controllers
{
    [ApiController]
    [Route("/")]
    
    public class ConsumidorKafka: ControllerBase
    {

        [HttpGet]
        public void ConsumirKafka ()
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = "kafka:9093", // Cambia esto al servidor y puerto de tu clúster Kafka
                GroupId = "my-consumer-group",
                AutoOffsetReset = AutoOffsetReset.Earliest, // Puedes configurar esto como "Latest" si deseas leer solo los nuevos eventos
            };

            using (var consumer = new ConsumerBuilder<Ignore, string>(config).Build())
            {
                consumer.Subscribe("test-topic"); // Cambia esto al nombre de tu tópico Kafka

                CancellationTokenSource cts = new CancellationTokenSource();
                Console.CancelKeyPress += (_, e) => {
                    e.Cancel = true; // Evita que la aplicación se cierre inmediatamente en Ctrl+C
                    cts.Cancel();
                };

                try
                {
                    //while (true)
                    //{
                        var result = consumer.Consume(cts.Token);
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

    }
}
