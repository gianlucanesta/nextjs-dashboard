'use server';

import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

export async function createInvoice(formData) {
  const customerId = formData.get('customerId');
  const amount = formData.get('amount');
  const status = formData.get('status');

  if (!customerId || !amount || !status) {
    throw new Error('Missing required fields');
  }

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, NOW())
  `;

  redirect('/dashboard/invoices');
}
