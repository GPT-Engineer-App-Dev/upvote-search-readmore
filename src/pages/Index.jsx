import { Button } from "@/components/ui/button";

const WelcomeMessage = () => (
  <div className="text-center">
    <h1 className="text-3xl mb-4">Your Blank Canvas</h1>
    <p className="mb-4">Chat with the agent to start making edits.</p>
    <Button>Get Started</Button>
  </div>
);

const Index = () => {
  return (
    <div className="flex-grow flex justify-center items-center">
      <WelcomeMessage />
    </div>
  );
};

export default Index;