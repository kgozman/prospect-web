import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesPipelineForm = () => {
  //Load Organization
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({
    prospect_id: '',
    stage: '',
    name: '',
    title: '',
    organization: '',
    // other fields
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/prospects')
      .then(response => setOrganizations(response.data))
      .catch(error => console.error('Error fetching Organizations:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/sales-pipeline', formData);
      console.log('SalesPipeline added:', response.data);

      // Handle success (e.g., clear form, show message)
    } catch (error) {
      console.error('Error adding SalesPipeline:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      /><br/>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      /><br/> 
      <input
        name="organization"
        value={formData.organization}
        onChange={handleChange}
        placeholder="Organization"
      /><br/> 
      {/* other fields */}
      <button type="submit">Add Prospect</button>
    </form>
  );
};

export default SalesPipelineForm;