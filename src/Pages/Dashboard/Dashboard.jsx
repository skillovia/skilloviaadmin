import React from 'react'
import AdminHeader from '../../Components/AdminHeader/AdminHeader'
import StatsCards from '../../Components/AdminStat/StatsCards'
import AdminWelcome from '../../Components/AdminHeader/AdminWelcome'


const Dashboard = () => {
  return (
    <div>

<AdminHeader />
<AdminWelcome />
<StatsCards />

    </div>
  )
}

export default Dashboard