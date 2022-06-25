import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { School, Public, LocalLibrary } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function AppLayout() {

  const location = useLocation();
  const navigate = useNavigate();
  const [currentActivePage, setCurrentActivePage] = useState('');

  useEffect(() => {
    setCurrentActivePage(location.pathname.substring('/app'.length+1));
  }, [location])

  const bottomNavigationStyles = { position: 'fixed', bottom: '0', left: '0', right: '0', boxShadow: '-3px 0px 10px 1px rgba(23,23,23,.1)' };
  
  return (
    <>
      <Outlet />
      <div style={{ marginBottom: '100px'}} />
      <BottomNavigation 
        value={currentActivePage} 
        sx={bottomNavigationStyles}
        onChange={(e, newPage) => navigate('/app/'+newPage)}
      >
        <BottomNavigationAction
          label="فضای اشتراکی"
          value="shared-space"
          icon={<Public />}
        />
        <BottomNavigationAction
          label="مدرسه"
          value="school-space"
          icon={<School />}
        />
        <BottomNavigationAction
          label="انجمن ها"
          value="community"
          icon={<LocalLibrary />}
        />
      </BottomNavigation>
    </>
  )
}