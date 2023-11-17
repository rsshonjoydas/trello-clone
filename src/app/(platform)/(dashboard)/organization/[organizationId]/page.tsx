import { OrganizationSwitcher } from '@clerk/nextjs';

const OrganizationIdPage = () => (
  <div>
    <OrganizationSwitcher hidePersonal />
  </div>
);

export default OrganizationIdPage;
