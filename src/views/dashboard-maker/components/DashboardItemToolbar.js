import React from 'react';
import PropTypes from 'prop-types';

import { IconDragDrop, IconCopy, IconSettings, IconTrash } from '@tabler/icons';

const DashboardItemToolbar = (props) => {
    const { title, type, onClickSettings, onClickClone, onClickDelete } = props;

    return (
        <>
            <div className="dashboard-item-toolbar">
                <div className="toolbar-item">
                    <div className="dashboard-item-drag MyDragHandleClassName">
                        <IconDragDrop /> {title}
                    </div>
                    <div className="dashboard-item-action-tools">
                        {type !== 'Node' && (
                            <>
                                <IconSettings onClick={onClickSettings} />
                                <IconCopy onClick={onClickClone} />
                            </>
                        )}
                        <IconTrash onClick={onClickDelete} />
                    </div>
                </div>
            </div>
        </>
    );
};

DashboardItemToolbar.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    onClickSettings: PropTypes.func,
    onClickClone: PropTypes.func,
    onClickDelete: PropTypes.func
};

export default DashboardItemToolbar;
