import { FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useWindowSize } from "../stateManagment/windowSize";
import DesktopMessages from "../components/DesktopMessages";
import MobileMessages from "../components/MobileMessages";

const MessagingPage = ({open}) => {
  
  const width = useWindowSize()

  const isMobile = width < 768

  return (
    <>
      {
        isMobile ? (
          <MobileMessages open={open}/>
        )
        :
        (
          <DesktopMessages open={open} />
        )
      }
    </>
  );
};

export default MessagingPage;
