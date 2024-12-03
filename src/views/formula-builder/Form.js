import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, ButtonBase } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import BackIcon from '@material-ui/icons/Backspace';

// services
import { FormulaBuilderService } from '_services';

// style constant
const useStyles = makeStyles((theme) => ({
    userAddDialog: {
        '&>div:nth-child(3)': {
            justifyContent: 'flex-end',
            '&>div': {
                margin: '0px',
                borderRadius: '0px',
                maxWidth: '450px',
                maxHeight: '100%'
            }
        }
    },
    fileInput: {
        display: 'none'
    },
    fileContainer: {
        background: theme.palette.background.default,
        padding: '30px 0',
        textAlign: 'center',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '24px',
        '& > svg': {
            verticalAlign: 'sub',
            marginRight: '5px'
        }
    },
    uploadImage: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '55px',
        height: '55px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        '& > svg': {
            verticalAlign: 'sub',
            marginRight: '5px'
        }
    },
    productProgress: {
        position: 'absolute',
        left: '0',
        top: '0',
        background: 'rgba(255, 255, 255, .8)',
        width: '100% !important',
        height: '100% !important',
        padding: '12px'
    },
    calcell: {
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        color: '#000',
        padding: '10px 0px !important',
        border: '1px solid #ddd',
        cursor: 'pointer'
    }
}));

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
    name: ''
    // formula: ''
};

const formulaHistoryReducer = (state, action) => {
    if (action.type === 'ADD') {
        return [...state, action.value];
    }

    if (action.type === 'REMOVE') {
        if (state.length) {
            const lastValue = [...state];
            lastValue.length -= 1;

            return lastValue;
        }
    }

    if (action.type === 'ADD_ALL') {
        return action.value;
    }

    return state;
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [formulaHistory, dispatchFormulaHistory] = React.useReducer(formulaHistoryReducer, []);
    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);
    const [isFormulaValid, setIsFormulaValid] = React.useState(false);

    React.useEffect(() => {
        if (id) {
            FormulaBuilderService.getFormulaBuilderById(id)
                .then((res) => {
                    if (res && res.data) {
                        const data = res.data;
                        setInitialValues((prevState) => ({
                            ...prevState,
                            name: data.name
                            // formula: data.formula
                        }));
                        try {
                            const formulaHistory = JSON.parse(data.history);
                            dispatchFormulaHistory({ type: 'ADD_ALL', value: formulaHistory });
                        } catch (e) {
                            console.log(e);
                            dispatchFormulaHistory([]);
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        }
    }, [id]);

    /* React.useEffect(() => {
        setInitialValues({ ...formulaHistory, formula: formulaHistory.join('') });
    }, [formulaHistory]); */

    const validation = Yup.object().shape({
        name: Yup.string().required('Required')
        // formula: Yup.string()
    });

    const handleSubmit = (values) => {
        if (formulaHistory.length === 0) {
            toast.error('Please add a formula');
            return;
        }
        const formula = formulaHistory.toString().replace(/,/g, '');
        const formData = {
            formula,
            name: values.name,
            history: JSON.stringify(formulaHistory)
        };
        if (!id) {
            FormulaBuilderService.saveFormulaBuilder(formData)
                .then((res) => {
                    if (res.message) {
                        toast.success('Saved Successfully!');
                        getData();
                        handleCloseDialog();
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        } else {
            FormulaBuilderService.updateFormulaBuilder(id, formData)
                .then((res) => {
                    if (res.message) {
                        toast.success('Saved Successfully!');
                        getData();
                        handleCloseDialog();
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        }
    };

    const validateFormulaHandler = () => {
        const formula = formulaHistory.toString().replace(/,/g, '');
        FormulaBuilderService.validateFormula({ expression: formula })
            .then((res) => {
                if (res && res.status) {
                    setIsFormulaValid(true);
                } else {
                    toast.error('Invalid Expression!');
                    setIsFormulaValid(false);
                }
            })
            .catch((err) => {
                toast.error('Something went wrong!');
                console.log(err.response);
                setIsFormulaValid(false);
            });
    };

    const generateFormulaHandler = (value) => {
        dispatchFormulaHistory({ type: 'ADD', value });
    };

    const handleRemoveHistory = () => {
        dispatchFormulaHistory({ type: 'REMOVE' });
    };

    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} className={classes.userAddDialog}>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validation} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{id ? 'Update Formula' : 'Add Formula'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="formula"
                                        name="formula"
                                        label="Formula"
                                        value={formulaHistory.toString().replace(/,/g, '')}
                                        // onChange={formik.handleChange}
                                        // error={formik.touched.formula && Boolean(formik.errors.formula)}
                                        // helperText={formik.touched.formula && formik.errors.formula}
                                        InputProps={{ readOnly: true }}
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="button" variant="contained" color="info" onClick={validateFormulaHandler}>
                                        Validate
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: '15px' }}>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('1')}
                                    component={ButtonBase}
                                >
                                    1
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('2')}
                                    component={ButtonBase}
                                >
                                    2
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('3')}
                                    component={ButtonBase}
                                >
                                    3
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('/')}
                                    component={ButtonBase}
                                >
                                    /
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('Fe2O3')}
                                    component={ButtonBase}
                                >
                                    Fe2O3
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('MgO')}
                                    component={ButtonBase}
                                >
                                    MgO
                                </Grid>

                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('4')}
                                    component={ButtonBase}
                                >
                                    4
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('5')}
                                    component={ButtonBase}
                                >
                                    5
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('6')}
                                    component={ButtonBase}
                                >
                                    6
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('+')}
                                    component={ButtonBase}
                                >
                                    +
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('Al2O3')}
                                    component={ButtonBase}
                                >
                                    Al2O3
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('CaO')}
                                    component={ButtonBase}
                                >
                                    CaO
                                </Grid>

                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('7')}
                                    component={ButtonBase}
                                >
                                    7
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('8')}
                                    component={ButtonBase}
                                >
                                    8
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('9')}
                                    component={ButtonBase}
                                >
                                    9
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('-')}
                                    component={ButtonBase}
                                >
                                    -
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('SO2')}
                                    component={ButtonBase}
                                >
                                    SO3
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('SiO2')}
                                    component={ButtonBase}
                                >
                                    SiO2
                                </Grid>

                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('(')}
                                    component={ButtonBase}
                                >
                                    (
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('0')}
                                    component={ButtonBase}
                                >
                                    0
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler(')')}
                                    component={ButtonBase}
                                >
                                    )
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('.')}
                                    component={ButtonBase}
                                >
                                    .
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('Na2O')}
                                    component={ButtonBase}
                                >
                                    Na2O
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('K2O')}
                                    component={ButtonBase}
                                >
                                    K2O
                                </Grid>
                                <Grid item xs={4} className={classes.calcell} onClick={handleRemoveHistory} component={ButtonBase}>
                                    <BackIcon style={{ fontSize: 'medium' }} />
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('*')}
                                    component={ButtonBase}
                                >
                                    *
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('CI')}
                                    component={ButtonBase}
                                >
                                    CI
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('P2O5')}
                                    component={ButtonBase}
                                >
                                    P2O5
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler('TiO2')}
                                    component={ButtonBase}
                                >
                                    TiO2
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    className={classes.calcell}
                                    onClick={() => generateFormulaHandler(' ')}
                                    component={ButtonBase}
                                >
                                    Space
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="text" color="error" onClick={handleCloseDialog}>
                                Cancel
                            </Button>
                            <AnimateButton>
                                <Button type="submit" variant="contained" disabled={!isFormulaValid}>
                                    {id ? 'Update' : 'Add'}
                                </Button>
                            </AnimateButton>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};

Form.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    id: PropTypes.number,
    getData: PropTypes.func
};

export default React.memo(Form);
