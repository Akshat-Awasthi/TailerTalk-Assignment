
import React from 'react';
import { MdSpaceDashboard } from "react-icons/md"; 
import { BiLogOut } from "react-icons/bi"; 
import { SiGoogleadsense } from "react-icons/si";
import { IoStatsChartSharp } from "react-icons/io5";
import { SiMagento } from "react-icons/si";




export const Sidebar_Links  = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <MdSpaceDashboard/>
    },
    {
        key: 'leads',
        label: 'Leads',
        path: '/leads',
        icon: <SiGoogleadsense/>
    },
    {
        key: 'agent',
        label: 'Agent',
        path: '/agent',
        icon: <SiMagento/>
    },
    {
        key: 'stats',
        label: 'Stats',
        path: '/stats',
        icon: <IoStatsChartSharp/>
    },
   
];

export const Sidebar_Logout  = [
    {
        key: 'logout',
        label: 'Logout',
        path: '/login',
        icon: <BiLogOut/>
    }
];
