insert into public.documents (
  id,
  title,
  status,
  source_type,
  file_name,
  mime_type,
  size_bytes,
  summary,
  uploaded_by_email,
  created_at
) values (
  '11111111-1111-4111-8111-111111111111',
  'Vendor Intake Security Review',
  'ready',
  'seed',
  'vendor-intake-security-review.md',
  'text/markdown',
  2048,
  'Synthetic vendor onboarding notes for security review, RAG, and human approval workflows.',
  'demo.admin@example.com',
  '2026-01-12T14:30:00Z'
), (
  '22222222-2222-4222-8222-222222222222',
  'Contract Exception Notes',
  'processing',
  'seed',
  'contract-exception-notes.md',
  'text/markdown',
  1024,
  'Synthetic notes representing a document still moving through extraction and chunking.',
  'demo.admin@example.com',
  '2026-01-15T11:45:00Z'
);

insert into public.document_chunks (
  id,
  document_id,
  ordinal,
  heading,
  content,
  token_count
) values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
  '11111111-1111-4111-8111-111111111111',
  1,
  'Scope and data access',
  'The vendor will process synthetic customer support summaries for the demo workflow. Production use would require a completed security review, signed data processing terms, and documented retention limits.',
  39
), (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
  '11111111-1111-4111-8111-111111111111',
  2,
  'Approval blockers',
  'Open blockers include incomplete subprocesser review, missing incident notification language, and unclear deletion timelines after contract end.',
  28
);
