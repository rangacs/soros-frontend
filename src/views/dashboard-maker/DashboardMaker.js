import React from 'react';

// material ui
import { Grid, Fab } from '@material-ui/core';

// third party
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

// helpers
import { widgetsReducer, isJSON } from '../../_helpers/dashboard-management';
import { DEFAULT_DASHBOARDITEMS } from '../../_helpers/default-data';

// project imports
import Dashboard from './components/Dashboard';
import SettingsPanel from './components/settings/SettingsPanel';

// icons
import { IconSettings } from '@tabler/icons';

// services
import { DashboardMakerService } from '_services';

const DashboardMaker = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dashboardItems, dispatchDashboardItems] = React.useReducer(widgetsReducer, !id ? DEFAULT_DASHBOARDITEMS : []);
    const [showSettingsPanel, setShowSettingsPanel] = React.useState(true);
    const [isDragging, setIsDragging] = React.useState(false);
    const [activeWidget, setActiveWidget] = React.useState(null);
    const [preview, setPreview] = React.useState(false);
    const [layoutTitle, setLayoutTitle] = React.useState('Layout');
    const [loading] = React.useState(false);

    const draggingHandler = (isDragging) => {
        setIsDragging(isDragging);
    };

    const layoutChangeHandler = (newLayout) => {
        dispatchDashboardItems({ type: 'UPDATE_WIDGET_POSITIONS', newLayout });
    };

    const setActiveWidgetHandler = (widget) => {
        setActiveWidget(widget);
        setShowSettingsPanel(true);
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    };

    const deleteDashboardItemHandler = React.useCallback((id) => {
        dispatchDashboardItems({ type: 'DELETE_WIDGET', id });
        setActiveWidget(null);
    }, []);

    const cloneDashboardItemHandler = (id) => {
        dispatchDashboardItems({ type: 'CLONE_WIDGET', id });
    };

    const settingsPanelHandler = () => {
        setShowSettingsPanel((prevState) => !prevState);
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    };

    const addDashboardItemHandler = React.useCallback((widgetType) => {
        dispatchDashboardItems({ type: 'ADD_WIDGET', widgetType });
    }, []);

    const changeLayoutTitleHandler = React.useCallback((e) => {
        setLayoutTitle(e.target.value);
    }, []);

    const previewHandler = () => {
        setPreview((previousState) => {
            if (!previousState) {
                settingsPanelHandler();
            }
            return !previousState;
        });
    };

    // eslint-disable-next-line consistent-return
    const saveLayoutHandler = () => {
        if (!layoutTitle) {
            toast.error('Dashboard name cannot be empty!');
            return false;
        }
        const formData = {
            layout: {
                id,
                layoutId: 1,
                layoutName: layoutTitle,
                widgets: dashboardItems
            }
        };

        if (!id) {
            DashboardMakerService.saveDashboardMaker(formData)
                .then((res) => {
                    if (res.message) {
                        toast.success('Saved Successfully!');
                        navigate('/settings/dashboard-maker');
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        } else {
            DashboardMakerService.updateDashboardMaker(formData)
                .then((res) => {
                    if (res.message) {
                        toast.success('Saved Successfully!');
                        navigate('/settings/dashboard-maker');
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        }
    };

    React.useEffect(() => {
        if (activeWidget) {
            dispatchDashboardItems({ type: 'UPDATE_ACTIVE_WIDGET', activeWidget });
        }
    }, [activeWidget]);

    React.useEffect(() => {
        if (id) {
            DashboardMakerService.getDashboardMakerById(id)
                .then((res) => {
                    if (res) {
                        setLayoutTitle(res[1].layout_name);
                        if (res[0].length) {
                            // eslint-disable-next-line prefer-const
                            let layout = [];
                            res[0].forEach((element) => {
                                layout.push({
                                    widgetId: element.widget_id,
                                    title: element.title,
                                    type: element.type,
                                    settings: isJSON(element.settings) ? JSON.parse(element.settings) : '',
                                    data: element.data
                                });
                            });

                            dispatchDashboardItems({ type: 'UPDATE_LAYOUT', layout });
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        }
    }, [id]);

    return (
        <Grid container className="dashboard-builder" style={{ minHeight: '100%', position: 'relative' }}>
            <Grid item xs={showSettingsPanel ? 9.5 : 12}>
                {dashboardItems.length > 0 ? (
                    <Dashboard
                        onDragging={draggingHandler}
                        onLayoutChange={layoutChangeHandler}
                        isDragging={isDragging}
                        dashboardItems={dashboardItems}
                        activeWidget={activeWidget}
                        onSetActiveWidget={setActiveWidgetHandler}
                        onDeleteDashboardItem={deleteDashboardItemHandler}
                        onCloneDashboardItem={cloneDashboardItemHandler}
                        preview={preview}
                    />
                ) : (
                    <div className="align-items-center d-flex h-100 justify-content-center w-100">
                        <div className="bg-white rounded">
                            {/* <img src={toAbsoluteUrl('/media/svg/drag-n-drop.svg')} className="img-fluid" alt="" /> */}
                            <h4 className="text-center my-3">Start Adding Widgets</h4>
                        </div>
                    </div>
                )}
            </Grid>
            <Grid
                item
                xs={showSettingsPanel ? 2.3 : 0}
                className="d-flex align-items-center zindex-2"
                style={{
                    position: 'fixed',
                    right: 0,
                    top: showSettingsPanel ? '' : '45%',
                    height: showSettingsPanel ? '100%' : '10%',
                    marginRight: '10px',
                    marginTop: '-20px',
                    width: showSettingsPanel ? '100%' : 'max-content'
                }}
            >
                {!showSettingsPanel && (
                    <Fab style={{ height: '30px', width: '36px', zIndex: '1' }} className="bg-primary">
                        <IconSettings
                            style={{ transition: 'all 0.3s ease-in-out 0s' }}
                            className="fa fa-cog text-white cursor-pointer fa-2x rotate-45deg-onHover"
                            onClick={settingsPanelHandler}
                        />
                    </Fab>
                )}
                {showSettingsPanel && (
                    <SettingsPanel
                        activeWidget={activeWidget}
                        onSaveLayout={saveLayoutHandler}
                        onAddDashboardItem={addDashboardItemHandler}
                        onDeleteDashboardItem={deleteDashboardItemHandler}
                        onSaveDashboardItemSetting={setActiveWidgetHandler}
                        layoutTitle={layoutTitle}
                        onChangeLayoutTitle={changeLayoutTitleHandler}
                        isLoading={loading}
                        layoutId={id}
                        preview={preview}
                        onPreview={previewHandler}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default DashboardMaker;
