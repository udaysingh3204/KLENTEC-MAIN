import { InquiryBoard } from "@/components/admin/InquiryBoard";

const InquiriesPage = () => (
  <InquiryBoard
    title="Inquiries"
    description="Everything that comes in through the contact form and exit-intent popup."
    showConvertAction
    emptyLabel="No inquiries found"
  />
);

export default InquiriesPage;
