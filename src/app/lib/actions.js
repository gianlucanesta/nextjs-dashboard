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

  const amountInCents = Math.round(parseFloat(amount) * 100);

  if (isNaN(amountInCents) || amountInCents < 0 || amountInCents > 2147483647) {
    throw new Error('Amount is out of valid range');
  }

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, NOW())
  `;

  redirect('/ui/invoices');
}

export async function updateInvoice(formData) {
  const id = formData.get('id');
  const customerId = formData.get('customerId');
  const amount = formData.get('amount');
  const status = formData.get('status');

  if (!id || !customerId || !amount || !status) {
    throw new Error('Missing required fields');
  }

  const amountInCents = Math.round(parseFloat(amount) * 100);

  if (isNaN(amountInCents) || amountInCents < 0 || amountInCents > 2147483647) {
    throw new Error('Amount is out of valid range');
  }

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  redirect('/ui/invoices');
}

export async function deleteInvoice(formData) {
  const id = formData.get('id');
  if (!id) {
    throw new Error('Missing invoice id');
  }
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  redirect('/ui/invoices');
}
