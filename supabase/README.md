# Supabase Schema Scaffold

This folder contains the planned Supabase Postgres schema for the MVP. It is safe to keep in the repo because it contains no secrets and does not connect to a live project by itself.

Use it after a Supabase project exists:

```bash
supabase db push
supabase db reset
```

The public demo can continue using mock/seed data until Supabase credentials are added to local `.env` files.

## Schema Goals

- Store documents, extracted chunks, embeddings, AI runs, review decisions, and audit logs.
- Keep auth roles in `profiles` so Admin and Reviewer checks can be enforced through RLS.
- Use `pgvector` for local-to-Supabase vector search without adding Pinecone or another paid vector service.
- Keep seed data synthetic and safe for portfolio use.
