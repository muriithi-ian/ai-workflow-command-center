type RuntimeEnvironment = {
  apiBaseUrl: string;
  aiMode: string;
  supabaseConfigured: boolean;
  localLlmConfigured: boolean;
};

function hasValue(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

export function getRuntimeEnvironment(): RuntimeEnvironment {
  const localLlmModel = process.env.LOCAL_LLM_MODEL;

  return {
    apiBaseUrl: process.env.API_BASE_URL ?? "http://localhost:8000",
    aiMode: process.env.AI_MODE ?? "mock",
    supabaseConfigured:
      hasValue(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      hasValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    localLlmConfigured:
      hasValue(process.env.LOCAL_LLM_BASE_URL ?? "http://localhost:1234/v1") &&
      hasValue(localLlmModel)
  };
}
