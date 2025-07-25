'use client';

import { useState, useRef } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';

export function CreateInvoice() {
  return (
    <Link
      href="/ui/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }) {
  return (
    <Link
      href={`/ui/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const formRef = useRef(null);

  return (
    <>
      <form
        ref={formRef}
        action={deleteInvoice}
        style={{ display: 'inline' }}
        onSubmit={(e) => {
          if (!showConfirm) {
            e.preventDefault();
            setShowConfirm(true);
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="rounded-md border p-2 hover:bg-gray-100"
          aria-label="Delete"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            <p className="mb-4 text-center">
              Are you sure you want to delete this invoice?
            </p>
            <div className="flex gap-4">
              <button
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={() => {
                  setShowConfirm(false);
                  formRef.current?.requestSubmit();
                }}
              >
                Yes, Delete
              </button>
              <button
                type="button"
                className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
