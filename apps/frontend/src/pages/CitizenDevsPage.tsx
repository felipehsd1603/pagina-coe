import ProgramHero from '@/components/citizen-dev/ProgramHero';
import TierCards from '@/components/citizen-dev/TierCards';
import EnvironmentTiers from '@/components/citizen-dev/EnvironmentTiers';
import CourseList from '@/components/citizen-dev/CourseList';
import RegistrationCTA from '@/components/citizen-dev/RegistrationCTA';

export default function CitizenDevsPage() {
  return (
    <div>
      <ProgramHero />
      <TierCards />
      <EnvironmentTiers />
      <CourseList />
      <RegistrationCTA />
    </div>
  );
}
