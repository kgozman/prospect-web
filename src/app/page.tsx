'use client';
import Image from 'next/image'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ProspectsList from './ProspectsList';
import SalesPipelineForm from './SalesPipelineForm';
import Modal from  './components/Modal';
import Nav from './components/Nav';

export default function Home() {

  const [data, setData] = useState(null);
  const [prospects, setProspects] = useState([]);
  
  const [editingProspect, setEditingProspect] = useState(null);


  const [showModal, setShowModal] = useState(false);

  const openModal = () => {setShowModal(true);}
  const closeModal = () => {
    console.log("Close Modal");
    setEditingProspect(null);
    setShowModal(false);
  }
  const [dataRefresh, setDataRefresh] = useState(false);
  const handleProspectAdded = () => {
    setDataRefresh(true);
  };
  const handleEditProspect = (prospect: React.SetStateAction<null>) => {
    console.log("handleEditProspect");
    console.log(prospect)
    setEditingProspect(prospect); // Set the prospect to be edited
    openModal(); // Open the modal with the form
  };

  useEffect( () => {                                                                                                                                                                                 
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/sales-pipeline');
        setProspects( response.data);
      }catch(error) {
        console.log('Error fetching data: ', error);
      }
    }
    fetchData();
  }, [dataRefresh,showModal])


  useEffect(() => {
    if (dataRefresh) {
      // Logic to refresh data or perform other actions

      setDataRefresh(false); // Reset the flag
    }
  }, [dataRefresh]);
  const dialogRef = useRef(null); 

  return (
    <div>
      <Nav openModal={openModal}>
        <button className="btn" onClick={openModal}>Add</button>
      </Nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ProspectsList prospects={prospects} onEditProspect={handleEditProspect} />
      </main>
      <Modal showModal={showModal} onClose={closeModal}>
          <h3 className="font-bold text-lg pl-0">{editingProspect ? 'Edit Prospect' : 'New Prospect'}</h3>
          <hr/><br/>
          <SalesPipelineForm initialData={editingProspect} onClose={closeModal} prospects={prospects} setProspects={setProspects}/>
      </Modal>
    </div>
  )
}
