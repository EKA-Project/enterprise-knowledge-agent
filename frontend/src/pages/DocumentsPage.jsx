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
            {/* Documents page hero */}
            <section className="mb-6 flex items-start justify-between">
                <div>
                    <p className="doc-mono text-xs font-semibold uppercase tracking-[0.16em] text-(--text-eyebrow)">
                         INGESTION PIPELINE 
                    </p>

                    <h1 className="doc-heading mt-2 text-4xl font-bold text-(--text-primary)">
                        Raw sources, structured.
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-(--text-secondary)">
                        Every playbook, compliance standards and contract that feed EKA&apos;s intelligence.
                    </p>
                </div>

                <button
                    type="button"
                    className="rounded-full bg-(--primary) px-5 py-3 text-sm font-bold text-(--primary-contrast) transition-colors hover:bg-(--primary-hover)"
                >
                    + Ingest Document
                </button>
            </section>

           <DocumentsComponent />
        </div>
    );
}