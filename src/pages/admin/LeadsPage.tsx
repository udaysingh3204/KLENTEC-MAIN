import { InquiryBoard } from "@/components/admin/InquiryBoard";
import { LEAD_STATUSES } from "@/services/inquiryService";

const LeadsPage = () => (
  <InquiryBoard
    title="Leads"
    description="Inquiries that have been contacted or moved further into the pipeline."
    statusFilter={LEAD_STATUSES}
    emptyLabel="No leads yet"
  />
);

export default LeadsPage;
