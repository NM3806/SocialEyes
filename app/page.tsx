import LoadingScreen from "@/components/LoadingScreen";
import CommentModal from "@/components/modals/CommentModal";
import Postfeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import SignUpPrompt from "@/components/SignUpPrompt";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <div>
      <div className="text-black min-h-screen mx-auto flex justify-center">
        <Sidebar/>
        <Postfeed/>
        <Widgets/>
      </div>
      <CommentModal/>
      <SignUpPrompt/>

      <LoadingScreen/>
    </div>
  );
}
