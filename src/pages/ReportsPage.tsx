import React from 'react';
import { RHFormProvider } from '../context/RHFormProvider';
import AccessMatrixTable from '../components/AccessMatrixTable';

const ReportsPage = () => {
    return (
        <div>
            <RHFormProvider>
                <AccessMatrixTable />
            </RHFormProvider>
        </div>
    );
};

export default ReportsPage;