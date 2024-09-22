const ModalDelete = ({ isOpen, onClose, onConfirm, item }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h2 className='text-xl font-bold mb-4'>Delete Item</h2>
        <p>Are you sure you want to delete {item?.item_name}?</p>
        <div className='mt-4 flex justify-end'>
          <button
            onClick={onClose}
            className='mr-4 px-4 py-2 bg-gray-300 rounded'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 text-white rounded'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
