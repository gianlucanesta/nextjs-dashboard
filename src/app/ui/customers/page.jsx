import CustomersTable from './table';
import { fetchFilteredCustomers } from '@/app/lib/data';

export default async function Page({ searchParams }) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <CustomersTable customers={customers} />
    </div>
  );
}
