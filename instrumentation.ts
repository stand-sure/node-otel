import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";

// import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
// import { PeriodicExportingMetricReader, ConsoleMetricExporter } from "@opentelemetry/sdk-metrics";

// @ts-ignore
const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({}),    
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({}),
    }),
    instrumentations: [ getNodeAutoInstrumentations()],
    serviceName: "cja test"
});

sdk.start();

