import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '../../coreView/common/table';
import Modal from '../../coreView/common/modal';
import Input from '../../coreView/common/text-input';
import Select from '../../coreView/common/select-input';

export default function StatusView({containerState, statuses, appPrefs, onListLimitChange,
	onSearchChange, onSearchClick, onPaginationClick, onColumnSort, openEditModal, openDeleteModal, closeModal, onSaveStatus, onDeleteStatus, inputChange }) {

	let columns = [];
	  
	if (statuses.prefLabels != null && statuses.prefLabels.ADMIN_STATUS_TABLE != null) {
		columns = statuses.prefLabels.ADMIN_STATUS_TABLE;
	}
	let header = "Status";
	if (statuses.prefTexts.ADMIN_STATUS_PAGE != null && statuses.prefTexts.ADMIN_STATUS_PAGE.ADMIN_STATUS_PAGE_HEADER != null) {
		header = statuses.prefTexts.ADMIN_STATUS_PAGE.ADMIN_STATUS_PAGE_HEADER;
	}
	
	return (
		<div>
	  		<Table
	  			containerState={containerState}
	  			header={header}
	  			items={statuses.items}
	  			itemCount={statuses.itemCount}
	  			listStart={statuses.listStart}
	  			listLimit={statuses.listLimit}
	  			columns={columns}
	  			appPrefs={appPrefs}
	  			onListLimitChange={onListLimitChange}
	  			onSearchChange={onSearchChange}
	  			onSearchClick={onSearchClick}
	  			onPaginationClick={onPaginationClick}
	  			onColumnSort={onColumnSort}
	  			openEditModal={openEditModal}
	  			openDeleteModal={openDeleteModal}
	  		/>
	  		<Modal isOpen={containerState.isEditModalOpen} onClose={closeModal()} >
	  			<div className="modal-dialog">
	  				<div className="modal-content">
	  					<div className="modal-header">
	  						<button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
	  						<h4 className="modal-title">User</h4>
	  					</div>
	  					<div className="modal-body">
	  						<Input name="STATUS_NAME_input" label="Name" required="true" errors={containerState.errors} onChange={inputChange('name')} value={(statuses.selected != null && statuses.selected.name != null)?statuses.selected.name:""}/>
	  						<Input name="STATUS_CODE_input" label="Code" required="true" errors={containerState.errors} onChange={inputChange('code')} value={(statuses.selected != null && statuses.selected.code != null)?statuses.selected.code:""}/>
	  						
	          
	  						
	  						
	  					</div>
	  					<div className="modal-footer">
	  						<button type="button" className="btn btn-primary" onClick={onSaveStatus()}>Save</button>
	  						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal()}>Close</button>
	  					</div>
	  				</div>
	  			</div>
	  		</Modal>
	  		<Modal isOpen={containerState.isDeleteModalOpen} onClose={closeModal()} >
	  			<div className="modal-dialog">
	  				<div className="modal-content">
	  					<div className="modal-header">
	  						<button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
	  						<h4 className="modal-title">Delete {containerState.selectedName}</h4>
	  					</div>
	  					<div className="modal-body">
	  						<h3>Are you sure you want to delete?</h3>
	  					</div>
	  					<div className="modal-footer">
	  						<button type="button" className="btn btn-primary" onClick={onDeleteStatus(containerState.selectedId)}>Delete</button>
	  						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal()}>Close</button>
	  					</div>
	  				</div>
	  			</div>
	  		</Modal>
	  	</div>
	);
}


StatusView.propTypes = {
	containerState: PropTypes.object,
	statuses: PropTypes.object,
	appPrefs: PropTypes.object,
	onListLimitChange: PropTypes.func,
	onSearchChange: PropTypes.func,
	onSearchClick: PropTypes.func,
	onPaginationClick: PropTypes.func,
	onColumnSort: PropTypes.func,
	openEditModal: PropTypes.func,
	openDeleteModal: PropTypes.func,
	closeModal: PropTypes.func,
	onSaveLanguage: PropTypes.func,
	onDeleteLanguage: PropTypes.func,
	inputChange: PropTypes.func
};
