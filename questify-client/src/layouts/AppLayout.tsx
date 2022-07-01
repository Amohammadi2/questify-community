import { BottomNavigation, BottomNavigationAction, Grid, Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { School, Public, LocalLibrary } from "@mui/icons-material";
import { useEffect, useState } from "react";

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";

const actions = [
  { icon: <Person />, name: 'تنظیمات پروفایل' }
];

// export function OpenIconSpeedDial() {
//   return (
//     <SpeedDial
//       ariaLabel="SpeedDial openIcon example"
//       sx={{ position: 'absolute', bottom: 70, right: 60 }}
//       icon={<Settings />}
//     >
//       {actions.map((action) => (
//         <SpeedDialAction
//           key={action.name}
//           icon={action.icon}
//           tooltipTitle={action.name}
//         />
//       ))}
//     </SpeedDial>
//   );
// }




export default function AppLayout() {

  const location = useLocation();
  const navigate = useNavigate();
  const [currentActivePage, setCurrentActivePage] = useState('');

  useEffect(() => {
    setCurrentActivePage(location.pathname.substring('/app'.length+1));
  }, [location])

  const bottomNavigationStyles = { boxShadow: '-3px 0px 10px 1px rgba(23,23,23,.1)' };
  
  return (
    <>
      <Grid container direction="column" sx={{ height: '100%' }}>
        <Grid item sx={{ flexGrow: '1', position: 'relative'}}>
          <div style={{ position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', overflowY: 'scroll' }}>
            <Outlet />
          </div>
        </Grid>
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
      </Grid>
    </>
  )
}