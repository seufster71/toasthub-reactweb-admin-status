import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../coreView/common/modal';
import TextBuilder from '../../coreView/common/text-input-builder';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
import SelectBuilder from '../../coreView/common/select-input-builder';
import CheckBox from '../../coreView/common/checkBox';
import Switch from '../../coreView/common/switch';
import moment from 'moment';

export default function RolesModifyView({containerState, item, inputFields, appPrefs, itemPrefForms, onSave, onCancel, inputChange, applicationSelectList}) {
    
    let adminRoleFormTitle = {};

    let adminRoleFormCode = {};
    
    let adminRoleFormApplication = {};
    let applicationOptions = [];
    if (applicationSelectList != null) {
    	applicationOptions = applicationSelectList;
    }
    
    let adminRoleFormActive = {};
    let activeDefault = true;
    let activeOptions = [];

    if (itemPrefForms != null && itemPrefForms.ADMIN_ROLE_FORM != null) {
    	for (let i = 0; i < itemPrefForms.ADMIN_ROLE_FORM.length; i++) {
    		switch (itemPrefForms.ADMIN_ROLE_FORM[i].name) {
    		case "ADMIN_ROLE_FORM_TITLE":
    			adminRoleFormTitle = itemPrefForms.ADMIN_ROLE_FORM[i];
    			break;
    		case "ADMIN_ROLE_FORM_CODE":
    			adminRoleFormCode = itemPrefForms.ADMIN_ROLE_FORM[i];
    			break;
    		case "ADMIN_ROLE_FORM_APPLICATION":
    			adminRoleFormApplication = itemPrefForms.ADMIN_ROLE_FORM[i];
    			break;
    		case "ADMIN_ROLE_FORM_ACTIVE":
    			adminRoleFormActive = itemPrefForms.ADMIN_ROLE_FORM[i];
    			if (adminRoleFormActive.classModel != "") {
    				let activeModel = JSON.parse(adminRoleFormActive.classModel);
    				if (item != null && item[activeModel.field] != null) {
    					activeDefault = item[activeModel.field];
    				}
    				activeOptions = JSON.parse(adminRoleFormActive.value);
    			}
    			break;
    		}
    	}
    }
    
    let applicationDefault = 0;
    
    let created = "";
    if (item != null && item.created != null) {
    	created = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(item.created).toDate());
    	created = <div>Created: {created}</div>;
    }
    
    let modified = "";
    if (item != null && item.modified != null) {
    	modified = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(item.modified).toDate());
    	modified = <div>Last Modified: {modified}</div>
    }
    
    return (
    	<div className="col-lg-12">
			<h4 className="modal-title">Role</h4>
			{created}
			{modified}
			<div className="row">
				<div className="col-sm-4">
					<MultiLangTextInput field={adminRoleFormTitle} item={item} inputFields={inputFields} containerState={containerState} onChange={inputChange} appPrefs={appPrefs}/>		
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<TextBuilder item={item} field={adminRoleFormCode} inputFields={inputFields} containerState={containerState} onChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<SelectBuilder item={item} field={adminRoleFormApplication}  inputFields={inputFields} containerState={containerState} onChange={inputChange} options={applicationOptions}/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<Switch item={item} field={adminRoleFormActive} inputFields={inputFields} errors={containerState.errors} onChange={inputChange}/>
				</div>
			</div>
			
			<button type="button" className="btn btn-primary" onClick={onSave()}>Save</button>
			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCancel()}>Cancel</button>
    	</div>
    );
}


RolesModifyView.propTypes = {
  containerState: PropTypes.object,
  item: PropTypes.object,
  appPrefs: PropTypes.object,
  itemPrefForms: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  inputChange: PropTypes.func
};
