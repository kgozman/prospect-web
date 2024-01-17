import React, { Key } from 'react';
import { FaRegStickyNote } from 'react-icons/fa';

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
    notes:  null; //'Prospect showed interest in cloud solutions',
    last_updated: string;

  
  }
  
interface ProspectsListProps {
  prospects: Prospect[];
  onEditProspect:{};
}
const ProspectsList: React.FC<ProspectsListProps & { onEditProspect: (prospect: Prospect) => void }> = ({ prospects, onEditProspect }) => {
//  const ProspectsList: React.FC<ProspectsListProps> = ({ prospects, onEditProspect }) => {
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
  debugger;

  
  const editProspect = 
  console.log("prospects")
  console.log(prospects)

  if(prospects.length>0){
    return(<div>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Stage</th>
              <th className="px-4 py-2 text-left">Est.</th>
              <th className="px-4 py-2 text-left">Prob</th>
              <th className="px-4 py-2 text-left">Exp Close</th>
              <th className="px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {_prospects.map((prospect) => (
              <tr key={prospect._id} className="align-text-top hover" onDoubleClick={() => onEditProspect(prospect)}>
                <td className="border px-4 py-2 text-left">
                  {prospect.name} - {prospect.title}<br/>
                  <h2 className="large-text">{prospect.organization}</h2>
                  {prospect.email}<br/>
                  {prospect.phone}<br/>                
                </td>
                {/* <td className="border px-4 py-2 text-left">{prospect.title}</td>
                <td className="border px-4 py-2 text-left">{prospect.organization}</td>
                <td className="border px-4 py-2 text-left">{prospect.email}</td>
                <td className="border px-4 py-2 text-left">{prospect.phone}</td> */}
                <td className="border px-4 py-2 text-left">{prospect.stage}</td>
                <td className="border px-4 py-2 text-right">{prospect.estimated_value}</td>
                <td className="border px-4 py-2 text-right">{prospect.probability}</td>
                <td className="border px-4 py-2 text-left">{formatDate(prospect.expected_close_date) }</td>
                <td className="border px-4 py-2 text-left">
                  Next Steps:{prospect.next_steps}<br/>
                  {Array.isArray(prospect.notes) ?
                    <FaRegStickyNote className="text-1xl text-blue-500" />
                  :
                    <></>
                  }
                  Updated: {prospect.last_updated}
                </td> 
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
