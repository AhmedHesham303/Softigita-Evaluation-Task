import { Button } from "@/components/ui/button";
import Content from "@/features/dispalyer/components/Content";
import Title from "@/features/dispalyer/components/Title";
import { useNavigate } from "react-router";
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-(image:--hero-bg) bg-cover bg-center h-screen flex justify-between items-center  p-20 w-full text-center">
      <div className="flex items-center justify-between mx-auto w-3/4  flex-col  h-full ">
        <div className="flex flex-col items-center gap-10">
          <Title titleText="Reuasable infinte scrolling component" />
          <Content
            contentText="A simple and flexible implementation of an infinite scrolling list built with React and TypeScript.
The component is designed to be reusable, configurable, and performance-focused, allowing data to load seamlessly as the user scrolls."
          />
        </div>
        <Button onClick={() => navigate("/breed")} className=" " size={"lg"}>
          See the list
        </Button>
      </div>
    </div>
  );
}
