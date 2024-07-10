import LoginPage from "@/components/login";
import GetHead from "@/components/shared/HeadTag";

export default function Home() {
  return (
    <main>
      <GetHead
        title="Login - Class Tracker"
        description="This is home and login page for ADC class tracker"
        keywords="ADC, Class, Tracker"
      />
      <LoginPage />
    </main>
  );
}
