import Form from '@/app/ui/invoices/create-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export default async function EditInvoicePage({ params }) {
  const invoice = await fetchInvoiceById(params.id);
  const customers = await fetchCustomers();

  // Puoi modificare il form per accettare anche i valori iniziali (initialValues)
  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">Edit Invoice</h1>
      <Form customers={customers} initialValues={invoice} />
    </main>
  );
}
