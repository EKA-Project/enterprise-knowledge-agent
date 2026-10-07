import { useContext } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import AdminDocument from '../components/documents/admin/AdminDocument.jsx';
import ManagerDocument from '../components/documents/manager/ManagerDocument.jsx';
import EmployeeDocument from '../components/documents/employee/EmployeeDocument.jsx';
import '../styles/document.css';


export default function DocumentsPage() {
    const { activeRole } = useContext(AuthContext);

    const roleComponents = {
        Admin: AdminDocument,
        Manager: ManagerDocument,
        Employee: EmployeeDocument,
    };

    const DocumentsComponent =
        roleComponents[activeRole] || EmployeeDocument;
    return (
        <div className="px-6 py-6">
            <DocumentsComponent />
        </div>
    );
    
}