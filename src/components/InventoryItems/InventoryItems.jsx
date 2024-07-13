import './InventoryItems.scss';
import edit from '../../assets/images/edit-24px.svg';
import del from '../../assets/images/delete_outline-24px.svg';
import ItemModal from '../../components/ItemModal/ItemModal';
import EditInventoryModal from '../../components/EditInventoryModal/EditInventoryModal';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import AddInventoryItemModal from '../../components/AddInventoryItemModal/AddInventoryItemModal'; 
import search from '../../assets/images/search-left.jpg';

const InventoryItems = ({
  handleReportItem,
  isDarkMode,
  filteredInventoryData,
  userRole,
  handleShowItemModal,
  handleShowEditModal,
  handleShowDeleteModal,
  handleSearchChange,
  searchInput,
  selectedItem,
  showItemModal,
  handleCloseItemModal,
  updateCartItems,
  showEditModal,
  handleCloseEditModal,
  getItemData,
  showDeleteModal,
  handleDeleteItem,
  handleCloseDeleteModal,
  handleShowAddModal, 
  handleAddInventoryItem, 
  showAddModal, 
  handleCloseAddModal 
}) => {
  return (
    <>
      <div className={`inventory ${isDarkMode ? 'inventory--dark' : 'inventory--light'}`}>
        <div className='inventory__search-bar'>
          <input
            type='text'
            placeholder='Search'
            className='inventory__input'
            value={searchInput}
            onChange={handleSearchChange}
          />
          <img
            className='inventory__search-img'
            src={search}
            alt={`${search} logo`}
             />
          <button className='inventory__button'>Search</button>
        </div>         
         {userRole === 'Admin' && (
            <div className='inventory__add-item'>
              <button
                className='inventory__add-button'
                onClick={handleShowAddModal}
              >
                Add Item
              </button>
            </div>
          )}
        <div className='inventory__items'>
          <ItemModal
            selectedItem={selectedItem}
            show={showItemModal}
            handleClose={handleCloseItemModal}
            updateCartItems={updateCartItems}
          />
          <EditInventoryModal
            show={showEditModal}
            handleClose={handleCloseEditModal}
            itemId={selectedItem?.id}
            updateInventory={getItemData}
          />     
           <AddInventoryItemModal
          onClose={handleCloseAddModal}
          isOpen={showAddModal}
          handleAddInventoryItem={handleAddInventoryItem}
        />
          <ModalDelete
            isOpen={showDeleteModal}
            onClose={handleCloseDeleteModal}
            onConfirm={handleDeleteItem}
            item={selectedItem}
          />
          {filteredInventoryData.map((item) => (
            <div
              key={item.id}
              className='inventory__item-wrapper'
            >
              <div className='inventory__item'>
                <div
                  className={`inventory__item-image-wrapper ${userRole === 'guest' ? 'disabled' : ''}`}
                  onClick={userRole !== 'guest' ? () => handleShowItemModal(item) : null}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className='inventory__item-image'
                  />
                </div>
                <div className='inventory__item-details'>
                  <h3 className='inventory__item-name'>{item.item_name}</h3>
                  <p className='inventory__item-description'>{item.description}</p>
                  {userRole !== 'guest' && <p className='inventory__item-description'>Quantity: {item.quantity}</p>}
                  <div className='inventory__item-container'>
                    <p className='inventory__item-description'>
                      Status: <span className={`inventory__item-status ${item.status === 'Out of Stock' ? 'inventory__item-status--outstock' : 'inventory__item-status--instock'}`}>{item.status}</span>
                    </p>
                    {userRole !== 'guest' && <button onClick={() => handleReportItem(item.id)} className="inventory__item-button">
                          Report
                    </button>}
                  </div>
                  {userRole === 'Admin' && (
                    <div className='inventory__item-links'>
                      <div className='inventory__item-link'>
                        <a
                          href={item.link}
                          target="_blank"
                           rel="noopener noreferrer"
                          className='inventory__item-link-hyper'
                        >
                          Click here to buy
                        </a>
                      </div>
                      <div className='inventory__item-links-logo'>
                        <img
                          src={edit}
                          alt={`${edit} logo`}
                          onClick={() => handleShowEditModal(item)}
                        />
                        <img
                          src={del}
                          alt={`${del} logo`}
                          onClick={() => handleShowDeleteModal(item)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InventoryItems;
