import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import Layout from '../../Components/Layout/Layout';
import ServiceList from './ServiceList';

const Skills = () => {


  return (
    <Layout>

 
    <div className="min-h-screen ">
  

      {/* Search and Filter Section */}
      <div className="px-4 lg:px-[8rem] py-6">
    

        <ServiceList />

    
      </div>
    </div>
    </Layout>
  );
};

export default Skills;