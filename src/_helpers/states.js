const states = {
    value: {
        HR_DRAFT: {
            on: {
                SAVE: { target: 'HR_DRAFT' },
                SUBMIT: { target: 'HR_NEW' }
            }
        },
        HR_NEW: {
            on: {
                APPROVE: { target: 'HR_APPROVED' },
                REJECT: { target: 'HR_NEW' }
            }
        },
        HR_APPROVED: {
            on: {
                APPROVE: { target: 'P_APPROVED' },
                REJECT: { target: 'P_REJECTED' }
            }
        },
        P_REJECTED: {
            on: {
                SAVE: { target: 'HR_DRAFT' },
                SUBMIT: { target: 'HR_NEW' }
            }
        },

        P_APPROVED: {
            on: {
                PROCESS: { target: 'P_PROCESSES' }
            }
        },
        P_PROCESSES: {
            type: 'final'
        }
    }
};

export default states;
