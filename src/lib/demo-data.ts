import { AnalyzeResponse } from "@/types/api";

export type DemoIncident = {
  id: string;
  name: string;
  logText: string;
  narrativeSteps: string[];
  response: AnalyzeResponse & { model_extra?: any };
};

export const demoIncidents: Record<string, DemoIncident> = {
  "1": {
    id: "1",
    name: "Incident 1 (New Issue)",
    logText: "[2026-06-27T12:00:00Z] ERROR: Database Connection Timeout in payments-service. Pool exhausted.",
    narrativeSteps: [
      "Parsing raw incident log...",
      "Searching Hindsight vector database...",
      "No similar incidents found. Initiating full analysis.",
      "cascadeflow selected Premium Model (gpt-4-turbo) due to low confidence.",
      "Analyzing root cause and generating playbook...",
      "Reflection Engine creating first operational memory...",
      "Memory Quality evaluated at 62. Stored to Hindsight."
    ],
    response: {
      incident_id: "demo-inc-1",
      parsed_incident: {
        raw_log: "[2026-06-27T12:00:00Z] ERROR: Database Connection Timeout in payments-service. Pool exhausted.",
        log_source: "payment-service",
        service: "payments",
        possible_language: "Java",
        important_error_lines: ["ERROR: Database Connection Timeout"],
        stack_traces: [],
        timestamps: ["2026-06-27T12:00:00Z"]
      },
      memory: {
        matches: [],
        confidence: 0.1
      },
      routing: {
        selected_model: "gpt-4-turbo",
        reason: "Low memory confidence. Complex reasoning required.",
        estimated_cost: 0.045,
        estimated_latency: 3.2
      },
      analysis: {
        severity: "critical",
        root_cause: "Connection pool exhausted due to spike in payment requests.",
        summary: "The payment service ran out of available database connections, causing cascading timeouts.",
        playbook: "1. Increase MAX_CONNECTIONS in config.\n2. Restart payment pods.\n3. Monitor pool metrics.",
        confidence: 0.85,
        recommendation: "Implement connection queuing or PgBouncer.",
        risk: "High",
        //@ts-ignore - injecting extra fields for UI
        model_extra: { memory_quality: 62, version: 1, usage_count: 0 }
      },
      pipeline: {
        parser_ms: 12,
        memory_ms: 45,
        router_ms: 15,
        llm_ms: 3200,
        total_ms: 3272
      }
    }
  },
  "2": {
    id: "2",
    name: "Incident 2 (Similar Issue)",
    logText: "[2026-06-28T09:15:00Z] ERROR: Database Connection Timeout in payments-service during migration.",
    narrativeSteps: [
      "Parsing raw incident log...",
      "Searching Hindsight vector database...",
      "1 Similar Incident Found (94% Match).",
      "cascadeflow selected Cheap Model (gemini-flash) due to high confidence.",
      "Reusing and adapting previous playbook...",
      "Reflection Engine updating stored memory...",
      "Memory Quality improved to 81. Hindsight updated."
    ],
    response: {
      incident_id: "demo-inc-2",
      parsed_incident: {
        raw_log: "[2026-06-28T09:15:00Z] ERROR: Database Connection Timeout in payments-service during migration.",
        log_source: "payment-service",
        service: "payments",
        possible_language: "Java",
        important_error_lines: ["ERROR: Database Connection Timeout"],
        stack_traces: [],
        timestamps: ["2026-06-28T09:15:00Z"]
      },
      memory: {
        matches: [
          {
            incident_id: "demo-inc-1",
            similarity_score: 0.94,
            root_cause: "Connection pool exhausted",
            playbook: "1. Increase MAX_CONNECTIONS in config.\n2. Restart payment pods.",
            engineer_notes: "Worked perfectly last time."
          }
        ],
        confidence: 0.94
      },
      routing: {
        selected_model: "gemini-flash",
        reason: "High memory confidence. Fast summarization sufficient.",
        estimated_cost: 0.001,
        estimated_latency: 0.8
      },
      analysis: {
        severity: "critical",
        root_cause: "Connection pool exhausted, exacerbated by active database migration.",
        summary: "The payment service ran out of database connections.",
        playbook: "1. Pause migration.\n2. Increase MAX_CONNECTIONS in config.\n3. Restart payment pods.\n4. Resume migration slowly.",
        confidence: 0.95,
        recommendation: "Do not run migrations during peak payment hours.",
        risk: "Medium",
        //@ts-ignore
        model_extra: { memory_quality: 81, version: 2, usage_count: 1 }
      },
      pipeline: {
        parser_ms: 10,
        memory_ms: 42,
        router_ms: 8,
        llm_ms: 800,
        total_ms: 860
      }
    }
  },
  "3": {
    id: "3",
    name: "Incident 3 (Identical Issue)",
    logText: "[2026-06-29T14:30:00Z] ERROR: Database Connection Timeout in payments-service.",
    narrativeSteps: [
      "Parsing raw incident log...",
      "Searching Hindsight vector database...",
      "Identical Incident Found (99% Match).",
      "cascadeflow bypassing LLM generation entirely.",
      "Instantly applying known high-quality playbook...",
      "Memory reused successfully. No reflection needed.",
      "Resolution time & cost dramatically reduced. (Quality: 94)"
    ],
    response: {
      incident_id: "demo-inc-3",
      parsed_incident: {
        raw_log: "[2026-06-29T14:30:00Z] ERROR: Database Connection Timeout in payments-service.",
        log_source: "payment-service",
        service: "payments",
        possible_language: "Java",
        important_error_lines: ["ERROR: Database Connection Timeout"],
        stack_traces: [],
        timestamps: ["2026-06-29T14:30:00Z"]
      },
      memory: {
        matches: [
          {
            incident_id: "demo-inc-2",
            similarity_score: 0.99,
            root_cause: "Connection pool exhausted",
            playbook: "1. Pause migration.\n2. Increase MAX_CONNECTIONS in config.\n3. Restart payment pods.\n4. Resume migration slowly.",
            engineer_notes: "Standard procedure now."
          }
        ],
        confidence: 0.99
      },
      routing: {
        selected_model: "cache-hit",
        reason: "Near exact match. Bypassing LLM execution.",
        estimated_cost: 0.000,
        estimated_latency: 0.05
      },
      analysis: {
        severity: "critical",
        root_cause: "Connection pool exhausted.",
        summary: "The payment service ran out of database connections.",
        playbook: "1. Pause migration.\n2. Increase MAX_CONNECTIONS in config.\n3. Restart payment pods.\n4. Resume migration slowly.",
        confidence: 0.99,
        recommendation: "Implement PgBouncer immediately.",
        risk: "Low",
        //@ts-ignore
        model_extra: { memory_quality: 94, version: 3, usage_count: 2 }
      },
      pipeline: {
        parser_ms: 8,
        memory_ms: 38,
        router_ms: 2,
        llm_ms: 0,
        total_ms: 48
      }
    }
  }
};
