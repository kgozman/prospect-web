import React, { Key } from 'react';

interface Prospect {
    _id: Key | null | undefined;
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    organization: string;
    // Add other relevant fields
  
    // Replace with actual ObjectId and data
    // prospect_id: string; //'5f50c31f8e7b51001702b1d7',
    stage: string; //'Initial Contact',
    estimated_value:  string; //500000,
    probability: string; // 60,
    expected_close_date:  string; //new Date(),
    next_steps:  string; //'Schedule a product demo',
    notes:  string; //'Prospect showed interest in cloud solutions',
    last_updated: string;
  
  }
  
interface ProspectsListProps {
  prospects: Prospect[];
}

const ProspectsList: React.FC<ProspectsListProps> = ({ prospects }) => {
  /* const _prospects: Prospect[] = [
    { id: '1', name: 'John Doe', title: 'CEO' },
    { id: '2', name: 'Jane Smith', title: 'CTO' },
    // ... more prospects
  ]; */

  const _prospects: Prospect[] = prospects;

  const formatDate = (dateString: string | number | Date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  console.log("prospects")
  console.log(prospects)

  if(prospects.length>0){
    return(<div>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Organization</th>
              <th className="px-4 py-2 text-left">email</th>
              <th className="px-4 py-2 text-left">phone</th>
              <th className="px-4 py-2 text-left">Stage</th>
              <th className="px-4 py-2 text-left">Estimated Value</th>
              <th className="px-4 py-2 text-left">Probability</th>
              <th className="px-4 py-2 text-left">Expected Close Date</th>
              <th className="px-4 py-2 text-left">Next Steps</th>
              <th className="px-4 py-2 text-left">Notes</th>
              <th className="px-4 py-2 text-right">Updated</th>
            </tr>
          </thead>
          <tbody>
            {_prospects.map((prospect) => (
              <tr key={prospect._id} className="align-text-top hover">
                <td className="border px-4 py-2 text-left">{prospect.name}</td>
                <td className="border px-4 py-2 text-left">{prospect.title}</td>
                <td className="border px-4 py-2 text-left">{prospect.organization}</td>
                <td className="border px-4 py-2 text-left">{prospect.email}</td>
                <td className="border px-4 py-2 text-left">{prospect.phone}</td>
                <td className="border px-4 py-2 text-left">{prospect.stage}</td>
                <td className="border px-4 py-2 text-right">{prospect.estimated_value}</td>
                <td className="border px-4 py-2 text-right">{prospect.probability}</td>
                <td className="border px-4 py-2 text-left">{ formatDate(prospect.expected_close_date) }</td>
                <td className="border px-4 py-2 text-left">{prospect.next_steps}</td>
                <td className="border px-4 py-2 text-left">{prospect.notes}</td>
                <td className="border px-4 py-2 text-left">{prospect.last_updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return (`Empty List`);
};

export default ProspectsList;
