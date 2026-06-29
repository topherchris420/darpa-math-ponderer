import { AppShell } from '@/components/AppShell';
import { MathematicsCollaborator } from '@/components/MathematicsCollaborator';

const Collaborator = () => {
  return (
    <AppShell eyebrow="Conjecture workspace">
      <MathematicsCollaborator />
    </AppShell>
  );
};

export default Collaborator;
