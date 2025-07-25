import Form from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/lib/data';

export default async function CreateInvoicePage() {
  const customers = await fetchCustomers();

  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">Create Invoice</h1>
      <Form customers={customers} />
    </main>
  );
}
